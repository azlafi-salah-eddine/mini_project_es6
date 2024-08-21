import {ENDPOINT} from "./constantes.js"
export default class Etudiants {
    static MAX_NOTE = 20 ;
    constructor(name,date,note) {
        this.name = name;
        this.date = date;
        this.note = note;
    }
    getAge = () => {
        return  new Date().getFullYear() - new Date(this.date).getFullYear();
    }
    isSucceeded = () => this.note >= 10
    static all = async function () {
        const response = await fetch(ENDPOINT)
        const etudiants = await response.json();
        return etudiants;
    }
    add = async function () {
        const response = await fetch(ENDPOINT,{
            method: "POST",
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                name: this.name,
                date: this.date,
                note: this.note
            })
        })
        return response;
    }
    static delete = async  function(id){
        const response = await fetch(ENDPOINT+"/"+id,{
            method: "DELETE",
            headers: {
                'content-type' : 'application/json'
            }
        })
        return response;
    }
}