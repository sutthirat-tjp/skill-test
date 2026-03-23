using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class QuestionService : IQuestionService {
    private readonly AppDbContext _context;
    public QuestionService(AppDbContext context) => _context = context;

    public async Task<ServiceResponse<IEnumerable<Question>>> GetAllAsync() {
        var response = new ServiceResponse<IEnumerable<Question>>();
        try {
            var data = await _context.Questions.Include(q => q.Choices).OrderBy(q => q.RunningNo).ToListAsync();
            response.Result = data;
            response.Success = true;
            response.Message = "ดึงข้อมูลรายการทั้งหมดสำเร็จ";
        } catch (Exception ex) { response.Message = ex.Message; }
        return response;
    }

    public async Task<ServiceResponse<Question>> GetByIdAsync(int id) {
        var response = new ServiceResponse<Question>();
        try {
            var data = await _context.Questions.Include(q => q.Choices).FirstOrDefaultAsync(q => q.Id == id);
            if (data == null) {
                response.Message = "ไม่พบข้อมูล";
                return response;
            }
            response.Result = data;
            response.Success = true;
            response.Message = "ดึงข้อมูลข้อสอบสำเร็จ";
        } catch (Exception ex) { response.Message = ex.Message; }
        return response;
    }

    public async Task<ServiceResponse<Question>> CreateOrUpdateAsync(Question question) {
        var response = new ServiceResponse<Question>();
        try {
            if (question.Id == 0) {
                await _context.Questions.AddAsync(question);
            } else {
                var existing = await _context.Questions.AsNoTracking().FirstOrDefaultAsync(q => q.Id == question.Id);
                if (existing == null) {
                    response.Message = "ไม่พบข้อมูลที่ต้องการแก้ไข";
                    return response;
                }
                // ลบ Choice เก่าแล้วลงใหม่ (Easy way)
                _context.Choices.RemoveRange(_context.Choices.Where(c => c.QuestionId == question.Id));
                _context.Entry(question).State = EntityState.Modified;
                await _context.Choices.AddRangeAsync(question.Choices);
            }
            await _context.SaveChangesAsync();
            response.Result = question;
            response.Success = true;
            response.Message = "บันทึกข้อมูลเรียบร้อย";
        } catch (Exception ex) { response.Message = ex.Message; }
        return response;
    }

    public async Task<ServiceResponse<bool>> DeleteAsync(int id) {
        var response = new ServiceResponse<bool>();
        try {
            var data = await _context.Questions.FindAsync(id);
            if (data == null) {
                response.Message = "ไม่พบข้อมูลที่ต้องการลบ";
                return response;
            }
            _context.Questions.Remove(data);
            await _context.SaveChangesAsync();
            response.Result = true;
            response.Success = true;
            response.Message = "ลบข้อมูลสำเร็จ";
        } catch (Exception ex) { response.Message = ex.Message; }
        return response;
    }
}