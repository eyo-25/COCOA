function CoinChartSkeleton() {
  return (
    <tbody>
      {Array.from({ length: 25 }, (_, index) => (
        <tr key={index} className="flex h-[45px] py-2">
          <td className="w-[25%] rounded-sm mr-3 h-full bg-gray-650/70"></td>
          <td className="w-[75%] rounded-sm h-full bg-gray-650/70"></td>
        </tr>
      ))}
    </tbody>
  );
}

export default CoinChartSkeleton;
