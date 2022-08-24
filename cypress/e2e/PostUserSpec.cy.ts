/// <reference types="Cypress" />

describe('API Tests - Post User', () => {

    let accessToken = 'ff424c30bc57020170f869ef4d6c720c52c80946ed2015583f83971c7510f550'
    let randomText = ""
    let testEmail = ""
    let invalidEmail = ""
    let userId = ""
    it('POST Request - Create user test', () => {
        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++)
        randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + '@gmail.com'

        cy.fixture('createUser').then((payload) =>{
            
            //1. create user (POST)
            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                body: {
                    "name": payload.name,
                    "gender": payload.gender,
                    "email": testEmail,
                    "status":payload.status
                }
   
            }).then((res)=>{
                cy.log(JSON.stringify(res))
                expect(res.status).to.eq(201)
                expect(res.body.data).has.property('email', testEmail)
                expect(res.body.data).has.property('name',payload.name)
                expect(res.body.data).has.property('status',payload.status)
                expect(res.body.data).has.property('gender',payload.gender)
                userId = res.body.data.id 
                cy.log("user id is: " + userId)
            })            
        
        })
    })

    it('GET Request - Verify the user created', () => {
            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v1/users/'+userId,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body.data).has.property('id', userId)
                expect(res.body.data).has.property('email', testEmail)
            })
            
    })

    it('GET Request - Verify the user created -- Invalid Id', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v1/users/361879379817319',
            headers: {
                'Authorization': 'Bearer '+ accessToken 
            },
            failOnStatusCode: false

        }).then((res)=>{
            expect(res.status).to.eq(404)   
        })
        
    })

    it('GET Request - Verify the user created -- Invalid Access Token', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v1/users/361879379817319',
            headers: {
                'Authorization': 'Bearer invalid token'
            },
            failOnStatusCode: false

        }).then((res)=>{
            expect(res.status).to.eq(404)   
        })
        
    })

})