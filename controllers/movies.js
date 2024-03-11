var MoviesSchema = require('../models/moviesSchema')
class moviesController {
  static async addmovies(req, res) {
    try {
      var InputData = req.body
      if (InputData.type != 'admin') {
        res.status(400).json({ message: 'access required' });
      }

      const existingMovie = await MoviesSchema.findOne({ moviename: InputData.moviename });

      if (existingMovie) {
        return res.status(400).json({ message: 'Movie with the same title already exists' });
      }
      await MoviesSchema.create(InputData)
        .then((data) => {
          res.status(200)
            .json({ message: 'Added ' });
        }).catch((err) => {
          res.status(502).json({ message: err.message });
        })

    } catch (error) {
      res.status(500)
        .json({ message: 'Server error' });
    }
  }
  static async search(req, res) {
    const searchTerm = req.query.text;
    try {
      const movies = await MoviesSchema.find({
        $or: [
          { moviename: { $regex: searchTerm, $options: 'i' } },
          { genre: { $regex: searchTerm, $options: 'i' } },
        ]
      });
      if (movies) {
        res.status(200).json({
          status: true,
          message: 'Products found',
          data: movies
        });

      } else {
        res.status(200).json({
          status: true,
          message: 'Products not found',
          data: null
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'Server error',
        data: null
      });
    }
  }
  static async getmovies(req, res) {
    let data = await MoviesSchema.find()
    res.status(200).json({
      status: true,
      message: 'movies found',
      data: data
    });
  }
  static async updatemovie(req, res) {
    try {
      if (req.body.type != 'admin') {
        res.status(500).json({ message: 'access required' });
      }
      var updateData = req.body
      const existingMovie = await MoviesSchema.findOne({ moviename: updateData.moviename });

      if (existingMovie) {
        return res.status(400).json({ message: 'Movie with the same title already exists' });
      }
      const filter = {_id:req.body.id }; // Replace with your actual _id value
      const update = {
          $set: {
            ...(updateData.moviename &&{moviename: updateData.moviename}),
            ...(updateData.hero && { hero: updateData.hero }),
            ...(updateData.genre && { genre: updateData.genre }),
            ...(updateData.director && { director: updateData.director }),
          }
      };
      await MoviesSchema.findOneAndUpdate(filter, update).then((data) => {
        if(!data){
          return res.status(400).json({ message: 'Movie not found' });
        }
        res.status(200)
          .json({ message: 'update successfull' });
      }).catch((err) => {
        res.status(502).json({ message: err.message });
      })
    } catch (error) {
      res.status(500)
        .json({ message: 'Server error' });
    }
  }

  static async DeleteMovie(req, res) {
    try {
      if (req.body.type != 'admin') {
        res.status(500).json({ message: 'access required' });
      }
      var movieId = req.query.id
      var data = await MoviesSchema.deleteOne({_id:movieId})
      if (data) {
        res.status(200)
          .json({ message: 'Deleted successfull' });
      } else {
        res.status(200).json({ message: "not found" });
      }
    }
    catch (error) {
      res.status(500)
        .json({ message: 'Server error' });
    }
  }
}

module.exports = moviesController



