// a good resolution for poor network

class TextReqService {
    constructor(url) {
        this.url = url;
        this.method = 'GET';
        this.credentials = 'include';
        this.retryTimes = 3;
        this.timeoutTime = 15; // secs
        this.curRetryTimes = 0;
        this.retryInterval = 1; // secs
        this.enabledLog = true;
        this.fetchSetting = null;
    }

    setMethod(method) {
        this.method = method;
        return this;
    }

    setCredentials(credential) {
        this.credentials = credential;
        return this;
    }

    setFetchSetting(setting) {
        this.fetchSetting = setting;
        return this;
    }

    setRetryTimes(times) {
        this.retryTimes = times;
    }

    setRetryInterval(secs) {
        this.retryInterval = secs;
    }

    setTimeOutTime(secs) {
        this.timeoutTime = secs;
    }

    request() {
        return new Promise((resolve, reject) => {
            this._request(res => {
                res.text().then(text => resolve(text));
            }, err => {
                reject(err);
            });
        });
    }

    _printErrorLog(err) {
        console.error(`TextReqService: request error in ${this.url}, retry:(${this.curRetryTimes}/${this.retryTimes}), error: ${err}`);
    }

    _request(successCallback, failureCallback) {
        this.curRetryTimes++;
        let url = this.url.includes('http') ? this.url : `${window.location.protocol}//${window.location.host}${this.url}`;
        let timeout = new Promise((resolve, reject) => {
            setTimeout(reject, this.timeoutTime * 1000 * this.curRetryTimes, 'request timed out');
        });
        let req = window.fetch(url, this.fetchSetting ? this.fetchSetting : {
            method: this.method,
            credentials: this.credentials
        });
        Promise
            .race([timeout, req])
            .then(res => successCallback(res))
            .catch(err => {
                this._printErrorLog(err);
                if (this.curRetryTimes < this.retryTimes) {
                    setTimeout(() => {
                        this._request(successCallback, failureCallback);
                    }, this.retryInterval * 1000);
                } else {
                    failureCallback(err);
                }
            });
    }
}

export default TextReqService;
