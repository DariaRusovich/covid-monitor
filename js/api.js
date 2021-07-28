const api = axios.create({
    baseURL: '//localhost:3000'
});
axios.interceptors.response.use((res) => {
    return [res.data, null];
}, (err) => {
    return [null, err];
});
api.interceptors.response.use((res) => {
    return [res.data, null];
}, (err) => {
    return [null, err];
});

async function getNums() {
    return await api.get('/nums')
}
async function addNum(num) {
    return await api.post('/nums', {num})
}
async function getUSDRate() {
    let [rates, ratesError] = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
    if (!ratesError) {
        rates = rates[0]
    }
    return [rates, ratesError]
}