import { usePokemonCard } from "@/store/usePokemonCard";
import { useEffect, useMemo, useState } from "react";
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";

export const useViewModel = (onSearch: (val: string) => void) => {
  const [search, setSearch] = useState("");
  const searchSubject = useMemo(() => new Subject<string>(), []);
  const { currentQuery } = usePokemonCard();

  useEffect(() => {
    if (!currentQuery?.q?.includes("name:")) {
      setSearch("");
    }
  }, [currentQuery?.q]);

  useEffect(() => {
    const subscription = searchSubject
      .pipe(
        debounceTime(200),
        distinctUntilChanged((prev, curr) => prev === curr)
      )
      .subscribe((value) => {
        onSearch(value);
      });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSearch]);

  useEffect(() => {
    searchSubject.next(search);
  }, [search, searchSubject]);

  return {
    search,
    setSearch,
  };
};
