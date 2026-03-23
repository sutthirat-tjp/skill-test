namespace backend.Models;

public class Question {
    public int Id { get; set; }
    public int RunningNo { get; set; }
    public string Title { get; set; } = string.Empty;
    
    // 1 คำถาม มีหลายตัวเลือก อาจมีมากกว่า 4 ตัวเลือก
    public List<Choice> Choices { get; set; } = new();
}

public class Choice {
    public int Id { get; set; }
    public string AnswerText { get; set; } = string.Empty;
    public bool IsKey { get; set; }
    
    public int QuestionId { get; set; }
}