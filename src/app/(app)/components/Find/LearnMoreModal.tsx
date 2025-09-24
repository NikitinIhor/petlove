import { NextPage } from "next";

interface LearnMoreModalProps {
  onClose: () => void;
}

const LearnMoreModal: NextPage<LearnMoreModalProps> = ({ onClose }) => {
  return <div>LearnMoreModal</div>;
};

export default LearnMoreModal;
