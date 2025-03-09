/**
 * HTTP返回结果
 */

export const success = (data?: any) => (data ? { code: "success", data } : { code: "success" });
export const error = (message?: string) => (message ? { code: "error", message } : { code: "error" });
