import DataModel from '../models/dataSchema.js'

export const getAllData = async (req, res) => {
  try {
    const data = await DataModel.find();
    if(!data){
      return res.status(404).json({message: "No data found" })
    }
    //console.log(data)
    res.status(200).json({
      data: data,
      message:'successfully displayed',
    })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
};

export const getDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await DataModel.findById(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
};
