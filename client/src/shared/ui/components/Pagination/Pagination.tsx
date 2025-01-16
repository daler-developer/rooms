import PageButton from "./PageButton.tsx";
import NextButton from "./NextButton.tsx";
import PrevButton from "./PrevButton.tsx";
import Dots from "./Dots.tsx";

type Props = {
  total: number;
  page: number;
  onChangePage?: (to: number) => void;
};

const Pagination = ({ total, page, onChangePage }: Props) => {
  const getPageButtonProps = (p: number) => {
    return {
      isActive: p === page,
      onClick: () => onChangePage?.(p),
      key: p,
    };
  };

  const getPageItems = () => {
    // edge cases
    if (total === 1) {
      return [<PageButton {...getPageButtonProps(1)}>1</PageButton>];
    }
    if (total === 0) {
      return [];
    }

    const result = [];
    let lastAddedPage: number;

    result.push(<PageButton {...getPageButtonProps(1)}>1</PageButton>);

    lastAddedPage = 1;

    if (page >= 4) {
      result.push(<Dots key="dots-left" />);
    }

    for (let i = page - 1; i <= page + 1; i++) {
      if (i <= 1 || i >= total) {
        continue;
      }

      result.push(<PageButton {...getPageButtonProps(i)}>{i}</PageButton>);

      lastAddedPage = i;
    }

    if (lastAddedPage + 1 < total) {
      result.push(<Dots key="dots-right" />);
    }

    result.push(<PageButton {...getPageButtonProps(total)}>{total}</PageButton>);

    return result;
  };

  const handlePrev = () => {
    if (page === 1) {
      return;
    }

    onChangePage?.(page - 1);
  };

  const handleNext = () => {
    if (page === total) {
      return;
    }

    onChangePage?.(page + 1);
  };

  return (
    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      <PrevButton onClick={handlePrev} />
      {getPageItems()}
      <NextButton onClick={handleNext} />
    </nav>
  );
};

export default Pagination;
