const mongoose = require('mongoose');
const riwayatService = require('../../services/riwayat.service');

const getHistoryHandler = async (request, h) => {
  const { userId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return h.response({ error: true, message: 'User ID tidak valid' }).code(400);
  }
  try {
    const history = await riwayatService.getUserHistory(userId);
    return {
      error: false,
      message: 'success',
      history,
    };
  } catch (err) {
    console.error(err);
    return h.response({ error: true, message: 'Gagal mengambil riwayat' }).code(500);
  }
};

module.exports = {
  getHistoryHandler,
};
