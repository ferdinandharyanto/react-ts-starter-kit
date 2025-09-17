/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useImperativeHandle, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
} from "lucide-react";
import { SkeletonLoader } from "@/components";
import { isAxiosError } from "axios";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface SortState {
  key: string | null;
  direction: "asc" | "desc" | null;
}

export interface ApiControllerParams {
  id?: string | number;
  name?: string;
  params: {
    page?: number;
    limit?: number;
    search?: string;
    sort?: any;
    [key: string]: any;
  };
}

interface TableServerProps<T> {
  columns: Column<any>[];
  apiController: (params: ApiControllerParams) => UseQueryResult<T, unknown>;
  tableRef?: React.Ref<any>;
  query?: Record<string, any>;
  defaultSort?: any[];
  parentId?: string | number;
  parentName?: string;
  apiParentKey?: keyof T;
  canRefetch?: boolean;
  handleSetRefresh?: (fn: () => void | undefined) => void;
  debounceSorting?: number;
}

const getValueKey = (key: any, data: any) => data?.[key] || [];

const PAGE_LIMIT_OPTIONS = [5, 10, 20, 50, 100];

export const TableServer = <T extends Record<string, any>>({
  columns,
  apiController,
  tableRef,
  query,
  defaultSort,
  parentId,
  parentName,
  apiParentKey,
}: TableServerProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sortList, setSortList] = useState<SortState>({
    key: null,
    direction: null,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sortParam = useMemo(() => {
    return sortList.key && sortList.direction
      ? [{ key: sortList.key, order: sortList.direction }]
      : defaultSort;
  }, [sortList.key, sortList.direction, defaultSort]);

  const apiParams = useMemo<ApiControllerParams>(
    () => ({
      id: parentId,
      name: parentName,
      params: {
        page: currentPage || undefined,
        limit: limit || undefined,
        sort: sortParam,
        ...(query || {}),
      },
    }),
    [parentId, parentName, currentPage, limit, sortParam, query]
  );

  const { data, isFetching, isError, error, refetch, isLoading } =
    apiController(apiParams);

  useImperativeHandle(tableRef, () => ({
    update: () => {
      refetch();
    },
  }));

  const toggleSort = (key: string) => {
    setSortList((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
      }
      return { key, direction: "asc" };
    });
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
  };

  const pageCount = (data as any)?.info?.pages || 0;
  const content =
    data && apiParentKey !== undefined
      ? getValueKey(apiParentKey, data)
      : (data as any)?.results || [];

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    if (isAxiosError(error)) {
      const message = error.response?.data?.error || "Failed to load data";
      setErrorMessage(message);
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  return (
    <>
      <div className="space-y-4">
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="border-b border-gray-200 bg-blue-50">
              <tr>
                {columns.map((col) => {
                  const isActive = sortList.key === String(col.key);
                  return (
                    <th
                      key={String(col.key)}
                      scope="col"
                      className="px-6 py-3 text-xs font-semibold text-blue-700 uppercase tracking-wide"
                    >
                      <div className="flex justify-between items-center">
                        {col.header}
                        <button
                          onClick={() => toggleSort(String(col.key))}
                          className="p-1 rounded hover:bg-blue-100 hover:text-blue-700 transition"
                        >
                          {isActive ? (
                            sortList.direction === "asc" ? (
                              <ArrowUp size={12} />
                            ) : (
                              <ArrowDown size={12} />
                            )
                          ) : (
                            <ArrowUpDown size={12} />
                          )}
                        </button>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading || isFetching ? (
                [...Array(5)].map((_, idx) => (
                  <tr key={idx}>
                    {[...Array(columns.length)].map((_, index) => (
                      <td key={index} className="p-3">
                        <SkeletonLoader className="w-full h-6" count={1} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : isError && errorMessage ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center text-gray-500 p-5"
                  >
                    {errorMessage}
                  </td>
                </tr>
              ) : content.length > 0 ? (
                content.map((row: any, i: number) => (
                  <tr
                    key={i}
                    className="odd:bg-gray-50 hover:bg-blue-50 transition-colors duration-150"
                  >
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        className="px-6 py-4 text-sm text-gray-700"
                      >
                        {col.render ? col.render(row) : String(row[col.key])}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-8 text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pageCount > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Rows per page:</span>
            <div className="relative">
              <select
                value={limit}
                onChange={handleLimitChange}
                className="appearance-none pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
              >
                {PAGE_LIMIT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
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
            pageCount={pageCount}
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
      )}
    </>
  );
};
