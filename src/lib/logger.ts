export function logServer(message: string, meta: Record<string, any> = {}) {
    const time = new Date().toISOString();
    // Simple server-side logging output to console (could be extended)
    console.info(`[server] ${time} - ${message}`, meta);
}

export function logError(message: string, error?: unknown) {
    const time = new Date().toISOString();
    console.error(`[server][error] ${time} - ${message}`, error);
}
