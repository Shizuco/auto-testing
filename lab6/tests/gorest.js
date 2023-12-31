import { describe, it } from "mocha"
import request from "supertest"

const API_BASE_URL = "https://gorest.co.in/public/v1"
const ACCESS_TOKEN = "Bearer 341e5f824301a898cd73eff72fcdca664cbb8a44bb6b5489eada56b2fb2c25d3"  // replace with your access token

function doRequest (preparation) {
    let r = request(API_BASE_URL)
    r = preparation(r)
    r = r.set("Accept", "application/json")
    r = r.set("Authorization", ACCESS_TOKEN)
    return r
}

describe ("gorest.co.in", ()=> {
    
    let userId = null

    it ("get list of users", done => {
        doRequest(r => r.get("/users"))
        .expect("Content-Type", /json/)
        .expect(200, done)
    })

    it ("create new user", done => {
        doRequest(r => r.post("/users").send({
            name: "Ivan Ivanoff",
            gender: "male",
            email: "ivanoff4513@gmail.com",
            status: "inactive"
        }))
        .expect("Content-Type", /json/)
        .expect(201, (err, res) => {
            if (err) return done(err)
            userId = res.body.data.id
            done()
        })
    })

    it ("update user", done => {
        doRequest(r => r.patch("/users/"+userId).send({
            status: "active"
        }))
        .expect('Content-Type', /json/)
        .expect(200, done)
    })

    it ("delete user", done => {
        doRequest(r => r.delete("/users/"+userId))
        .expect(204, done)
    })

})
