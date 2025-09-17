import React, { useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal as Ellipsis,
} from "lucide-react";
import { SkeletonLoader } from "@/components";

export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface TableClientProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  noDataMessage?: React.ReactNode;
  keyExtractor?: (item: T) => string | number;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
}

export const TableClient = <T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  noDataMessage = "No data available",
  keyExtractor,
  pageSizeOptions = [5, 10, 20, 50],
  defaultPageSize = 10,
}: TableClientProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);

  const totalPages = Math.ceil(data.length / pageSize);

  const getRowKey = (item: T, index: number) => {
    if (keyExtractor) return keyExtractor(item);
    const id = item.id as string | number | undefined;
    return id ?? index;
  };

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1);
  };

  const renderContent = () => {
    if (loading) {
      return [...Array(5)].map((_, idx) => (
        <tr key={idx}>
          {columns.map((_, index) => (
            <td key={index} className="p-3">
              <SkeletonLoader className="w-full h-6" count={1} />
            </td>
          ))}
        </tr>
      ));
    }

    if (data.length === 0) {
      return (
        <tr>
          <td
            colSpan={columns.length}
            className="text-center py-10 text-gray-400 italic"
          >
            {noDataMessage}
          </td>
        </tr>
      );
    }

    return paginatedData.map((row, i) => (
      <tr
        key={getRowKey(row, i)}
        className="odd:bg-gray-50 hover:bg-blue-50 transition-colors duration-150 ease-in-out"
      >
        {columns.map((col) => (
          <td key={String(col.key)} className="px-6 py-4 text-sm text-gray-700">
            {col.render ? col.render(row) : String(row[col.key])}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full border-collapse text-left bg-white">
          <thead className="bg-blue-50 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-6 py-3 text-xs font-semibold text-blue-700 uppercase tracking-wide"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderContent()}</tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Rows per page:</span>
          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="appearance-none pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        <ReactPaginate
          nextLabel={<ChevronRight />}
          previousLabel={<ChevronLeft />}
          breakLabel={<Ellipsis />}
          pageCount={totalPages}
          onPageChange={handlePageClick}
          forcePage={currentPage - 1}
          containerClassName="flex items-center gap-2 text-sm font-medium"
          pageLinkClassName="px-3 py-1.5 rounded-md hover:bg-blue-100 text-gray-700 hover:text-blue-700"
          activeLinkClassName="!bg-blue-600 !text-white"
          breakClassName="text-gray-500 cursor-pointer"
          previousClassName="text-gray-600 hover:text-blue-700 cursor-pointer"
          nextClassName="text-gray-600 hover:text-blue-700 cursor-pointer"
          disabledClassName="opacity-50 !cursor-not-allowed"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};
