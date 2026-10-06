function BitArray({
  bits,
  highlightedPositions = [],
  highlightMode = "add"
}) {
  return (
    <div className="bitArray">

      {bits.map((bit, index) => {

        const highlighted =
          highlightedPositions.includes(index);

        return (
          <div
            key={index}
            className={`
              bitCell
              ${bit === 1 ? "active" : ""}
              ${
                highlighted
                  ? `highlighted ${highlightMode}Highlight`
                  : ""
              }
            `}
          >

            <span className="bitValue">
              {bit}
            </span>

            <span className="bitIndex">
              {index}
            </span>

          </div>
        );
      })}

    </div>
  );
}

export default BitArray;