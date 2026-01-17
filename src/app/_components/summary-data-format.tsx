interface SummaryDataFormatProps{
    label: string
    data?: string
}

const SummaryDataFormat = ({ label, data } : SummaryDataFormatProps) => {
    return (
      <span className="flex flex-row gap-2">
        <span className="font-semibold">{label}:</span>
        <span className="first-letter:uppercase">{data}</span>
      </span>
    );
}
 
export default SummaryDataFormat;