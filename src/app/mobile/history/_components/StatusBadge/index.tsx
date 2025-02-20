interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  let label;
  let colorClass;

  switch (status) {
    case 'PENDING':
      label = '승인 대기 중';
      colorClass =
        'text-main-secondary border border-main-secondary bg-white-primary';
      break;
    case 'CANCEL':
      label = '대기 취소';
      colorClass = 'text-[#c2c5c7] border border-[#c2c5c7] bg-white-primary';
      break;
    case 'CONFIRMED':
      label = '승인 완료';
      colorClass =
        'text-main-primary border border-main-primary bg-white-primary';
      break;
    case 'RENTAL':
      label = '대여 중';
      colorClass = 'text-white-primary bg-main-secondary';
      break;
    case 'RETURN_PENDING':
      label = '반납 대기 중';
      colorClass =
        'text-main-secondary border border-main-secondary bg-white-primary';
      break;
    case 'RETURN_CONFIRMED':
      label = '반납 승인';
      colorClass =
        'text-main-primary border border-main-primary bg-white-primary';
      break;
    case 'RETURNED':
      label = '반납 완료';
      colorClass = 'text-[#c2c5c7] border border-[#c2c5c7] bg-white-primary';
      break;
    default:
      label = '알 수 없음';
      colorClass = 'text-gray-500 border border-gray-500 bg-white-primary';
  }

  return (
    <span
      className={`flex items-center whitespace-nowrap rounded-full px-[5px] text-caption-2_midi font-medium ${colorClass}`}
    >
      {label}
    </span>
  );
}
