import { fetchIPDetails } from './api'

const testedIP = '45.112.43.222';

const mockedData = {
    ip: testedIP,
    isp: 'Testing Holdings, LLC',
    location: {
        city: 'Cape Town',
        country: 'South Africa',
        geoNameId: 8891,
        lat: -33.925,
        lng: 18.423,
        postalCode: '33333',
        region: 'Africa',
        timezone: '+02:00'
    }
}

// replace the fetch with a mocked version
global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => Promise.resolve(mockedData),
    });
});


test('mock fetch and check returned data', async () => {
    //throws a TypeError: Cannot read property 'json' of undefined if omitted for some reason
    global.fetch.mockImplementationOnce(() => {
        return Promise.resolve({
            json: () => Promise.resolve(mockedData),
        });
    })
    const data = await fetchIPDetails(testedIP);
    expect(data.ipAddrData).not.toBeNull();
    expect(data.ipAddrData).toBe(mockedData);
    expect(data.isPaneOpen).toBeTruthy();
    expect(data.error).toBeFalsy();
})

test('mock fetch on invalid address', async () => {
    global.fetch.mockImplementationOnce(() => {
        return Promise.resolve({
            json: () => Promise.resolve({
                code: 422,
                messages: 'Input correct IPv4 or IPv6 address.'
            })
        })
    })
    const data = await fetchIPDetails(testedIP);
    expect(data.ipAddrData).toBeUndefined();
    expect(data.isPaneOpen).toBeFalsy();
    expect(data.error).toBe('Input correct IPv4 or IPv6 address.');
})

test('mock fetch on error case', async () => {
    global.fetch.mockImplementationOnce(() => {
        return Promise.reject({ message: 'Error on fetching. Check your connection' })
    })
    const data = await fetchIPDetails(testedIP);
    expect(data.ipAddrData).toBeUndefined();
    expect(data.error).toBe('Error on fetching. Check your connection');
})