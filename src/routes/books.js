const express = require("express");

const db = require("../db/db")
const { books } = require("../db/schema");
const { eq } = require("drizzle-orm");
const errorHandler = require("../utilities/errorHandler");

const router = express.Router();

router.get("/", async (req, res) =>{
    try{
        const entries = await db.select().from(books);

        return res.status(200).json(entries);
    }
    catch(error){
        return res.status(500).json({
            message: error.message || "something went wrong!"
        });
    }
})


router.get("/:id", async(req, res) =>{
    try{
        const [entry] = await db.select().from(books).where(eq(books.id, +req.params.id))
        if(!entry){
            return res.status(404).json({
                message: "Books not found",
            })
        }
        return res.status(200).json(entry);
    }
    catch(err){
        return errorHandler(res, err)
    }
})


module.exports = router;
