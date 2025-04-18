import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, usePathname, router } from 'expo-router'
import icons from '@/constants/icons';
import { useDebounce } from 'use-debounce'


const Search = () => {
    const path = usePathname();
    const params = useLocalSearchParams<{ query?: string }>();
    const [search, setSearch] = useState(params.query);

    // Debouncing the search input value
    const [debouncedSearch] = useDebounce(search, 500);

    // Updating search query
    const handleSearch = (text: string) => {
        setSearch(text);
    }

    // Effect to update router params when debounced search value changes
    React.useEffect(() => {
        if (debouncedSearch) {
            router.setParams({ query: debouncedSearch });
        }
    }, [debouncedSearch]);

    return (
        <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
            <View className="flex-1 flex flex-row items-center justify-start z-50">
                <Image source={icons.search} className="size-5" />
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder="Search for anything"
                    className="text-sm font-rubik text-black-300 ml-2 flex-1"
                />
            </View>

            <TouchableOpacity>
                <Image source={icons.filter} className="size-5" />
            </TouchableOpacity>
        </View>
    )
}

export default Search;
