//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

/*
import the router and create the follow routes using the GET http method
*/


import { Router } from 'express';
const router = Router();

//'/aboutme'
router
    .get('/aboutme', (req, res) => {
        const data = {
            firstName: "Guizhi",
            lastName: "Xu",
            biography: "After graduating high school, he pursued a degree in computer science. During his time there, he discovered a passion for artificial intelligence and machine learning.\nAfter high school, he took a gap year to backpack through Southeast Asia and South America, immersing himself in local communities and learning about their customs and traditions.",
            favoriteMovies: ["Joker", "Batman", "Titan", "Watchmen"],
            hobbies: ["Swin", "Jog", "Basketball"],
            fondestMemory: "Adopted Flipper(my cat)"
        };
        res.json(data);
    });


//'/mystory'
router
    .get('/mystory', (req, res) => {
        const data = {
            storyTitle: "My Journey",
            storyGenre: "Horror",
            story: "It was a dark and stormy night, and Sarah was driving home from a friend's party. She had taken a shortcut through the woods to get home faster. As she was driving, she heard a strange noise coming from the backseat. \nShe turned around to see what it was, but there was nothing there. Suddenly, the car engine sputtered and died. She tried to start it again, but it wouldn't start. Sarah was stranded in the middle of the woods, alone and scared. She tried to call for help, but there was no signal.\nAs she sat there in the darkness, she heard a tapping on the window. She turned to see a face staring back at her, with eyes that glowed in the darkness. It was a pale, ghostly figure with long hair and a twisted smile. \nThe figure disappeared as quickly as it appeared, but Sarah was left shaking with fear. She tried to start the car again, and this time it roared to life. She sped out of the woods, never looking back."
        };
        res.json(data);
    });


//'/educationhistory'
router
    .get('/educationhistory', (req, res) => {
        const data = [
            {
                "schoolName": "The High School Affiliated to Xi'an Jiaotong University",
                "degreeEarned": "H.S. Diploma",
                "numberOfYearsAttended": 4,
                "favoriteClasses": ["English", "PE", "Math", "Chemistry"],
                "favoriteSchoolMemory": "Hang out with my friends"
            },
            {
                "schoolName": "Xi'an Jiaotong University",
                "degreeEarned": "Bachelor Degree",
                "numberOfYearsAttended": 4,
                "favoriteClasses": ["1024", "2320", "2453", "3097"],
                "favoriteSchoolMemory": "Summer vacations"
            },
            {
                "schoolName": "Stevens Institute of Technology",
                "degreeEarned": "Master Degree",
                "numberOfYearsAttended": 2,
                "favoriteClasses": ["CS546", "CS554", "CS515", "CS570"],
                "favoriteSchoolMemory": "Spring Break"
            }
        ];
        res.json(data);
    });

//export the router 
export default router;

