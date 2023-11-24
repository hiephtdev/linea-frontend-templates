export class FetchUtil {
    constructor({ baseUrl }) {
        this.baseUrl = baseUrl;
    }
    async get({ headers, ...args }) {
        const url = this.createUrl(args);
        const response = await fetch(url, { method: 'GET', headers });
        return response.json();
    }
    async getBlob({ headers, ...args }) {
        const url = this.createUrl(args);
        const response = await fetch(url, { method: 'GET', headers });
        return response.blob();
    }
    async post({ body, headers, ...args }) {
        const url = this.createUrl(args);
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: body ? JSON.stringify(body) : undefined
        });
        return response.json();
    }
    async put({ body, headers, ...args }) {
        const url = this.createUrl(args);
        const response = await fetch(url, {
            method: 'PUT',
            headers,
            body: body ? JSON.stringify(body) : undefined
        });
        return response.json();
    }
    async delete({ body, headers, ...args }) {
        const url = this.createUrl(args);
        const response = await fetch(url, {
            method: 'DELETE',
            headers,
            body: body ? JSON.stringify(body) : undefined
        });
        return response.json();
    }
    createUrl({ path, params }) {
        const url = new URL(path, this.baseUrl);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value) {
                    url.searchParams.append(key, value);
                }
            });
        }
        return url;
    }
}
//# sourceMappingURL=FetchUtil.js.map