const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    groupName: { type: String, required: true },
    participants: { type: mongoose.Schema.Types.ObjectId, required: true },
    membersLimit: { type: Number, default: 5 },
    groupStatus: { type: String },
    groupProfile: { type: String, default: null },
  },
  { collection: "groupModal", timestamps: true }
);
const groupModal = mongoose.model("groupModal", groupSchema);

module.exports = groupModal;
