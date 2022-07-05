const fs = require("fs");
const path = require("path");
const basePath = process.cwd();
const dir = './uploads/GGGGG/generated'
const buildDir = `${basePath}/${dir}/json`;



const metadataList = [];

const writeMetaData = (_data) => {
    fs.writeFileSync(`${buildDir}/_metadata.json`, _data);
  };

const saveMetadata = (objectData) => {
    let shortName = objectData.filename.replace(
        /\.[^/.]+$/,
        ""
      );
    const tempAttributes = 2
    let tempMetadata = {
        name: `${objectData.name} #${shortName}`,
        description: `${objectData.description}`,
        image: `${objectData.baseUri}/${shortName}.jpeg`,
        edition: Number(shortName),
        attributes: tempAttributes,
        compiler: `${objectData.creator}`,
      };
      fs.writeFileSync(
        `${buildDir}/${shortName}.json`,
        JSON.stringify(tempMetadata, null, 2)
      );
      metadataList.push(tempMetadata);
};

const getImages = (_dir) => {
    try {
        console.log(_dir)
        return fs
        .readdirSync(_dir)
        .filter((item) => {
          let extension = path.extname(`${_dir}${item}`);
          if (extension == ".png" || extension == ".jpg" || extension == ".jpeg" ) {
            return item;        
        }
        })
        .map((i) => {
            
          return {
            filename: i,
            path: `${_dir}/${i}`,
          };
        });
    } catch {
      return null;
    }
  };



const startCreating = async (objectData) => {
    const images = getImages(dir);
    if (images == null) {
      console.log("Please generate collection first.");
      return;
    }

    images.forEach((imgObject) => {
        Object.assign(imgObject, objectData)
        saveMetadata(imgObject);
        console.log(
          `Created metadata for image: ${imgObject.filename}`
        );

    });
    writeMetaData(JSON.stringify(metadataList, null, 2));
  };
  const objectData = {
    name: 'test',
    description: 'desc',
    baseUri: 'sdfsdfs',
    creator: 'fsdfsdf',
    path: './uploads/GGGGG/generated'
}
  startCreating(objectData)