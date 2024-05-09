const multer = require('multer');

// Configuração do multer para armazenar os arquivos no disco
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para armazenar as imagens
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo (pode ser personalizado conforme necessário)
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Função de filtro para aceitar apenas arquivos de imagem
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Configuração do multer com as opções de armazenamento e filtro
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Middleware de upload de imagem
const uploadImage = upload.single('image');

module.exports = uploadImage;
