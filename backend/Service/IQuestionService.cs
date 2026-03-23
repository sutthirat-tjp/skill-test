using backend.Models;

namespace backend.Services;

public interface IQuestionService {
    Task<ServiceResponse<IEnumerable<Question>>> GetAllAsync();
    Task<ServiceResponse<Question>> GetByIdAsync(int id);
    Task<ServiceResponse<Question>> CreateOrUpdateAsync(Question question);
    Task<ServiceResponse<bool>> DeleteAsync(int id);
}