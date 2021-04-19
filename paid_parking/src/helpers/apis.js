import apiUrl from '../config.js'
const axios = require('axios');
const qs = require('qs');

export const getOccupiedSpotsUrl = apiUrl + '/parking'
export const setCarUrl = apiUrl + '/parking'
export const getCarSummaryUrl = apiUrl + '/parking/'
export const deleteCarUrl = apiUrl + '/parking/'

export function getOccupiedSpots(setSpots) {
    axios({
        method: 'get',
        url:  getOccupiedSpotsUrl,
    }).then((response) => {
        setSpots(response.data);
    }, (error) => {
        console.log(error);
    })
}

export function postCar(data) {
    axios({
        method: 'post',
        url: setCarUrl,
        data: qs.stringify(data),
        headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

export function getCarSummary(carId, showCarSummary) {
    axios({
        method: 'get',
        url:  getCarSummaryUrl + carId,
    }).then((response) => {
        showCarSummary(response.data);
    }, (error) => {
        console.log(error);
    })
}

export function deleteCar(carId) {
    axios({
        method: 'delete',
        url:  deleteCarUrl + carId,
    }).then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    })
}