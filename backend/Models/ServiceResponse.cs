namespace backend.Models;

public class ServiceResponse<T> {
    public T? Result { get; set; }
    public bool Success { get; set; } = false;
    public string Message { get; set; } = "Error";
}