### LeetCode 767 (Medium): Reorganize String [Practice](https://leetcode.com/problems/reorganize-string)
### Description  
The Reorganize String problem involves rearranging the characters of a given string so that no two adjacent characters are the same. If such a rearrangement is impossible, the task is to return an empty string.

### Examples  
**Example 1:**  
Input: `"aab"`  
Output: `"aba"`  
Explanation: We rearrange the string by placing 'a', 'b', and then 'a' again, ensuring no two adjacent characters are the same.

**Example 2:**  
Input: `"aaab"`  
Output: `""`  
Explanation: It is impossible to rearrange the string `"aaab"` such that no two adjacent characters are the same because 'a' appears more than ⌊(n+1)/2⌋ times.

**Example 3:**  
Input: `"aabbcc"`  
Output: `"acbacb"` or similar  
Explanation: We rearrange the characters to ensure no two adjacent characters are the same, filling the string with alternating characters.

### Thought Process  
1. **Brute Force Approach**: Initially, we might consider all permutations of the string and check if any meet the criteria. However, this approach would be highly inefficient due to the number of permutations.

2. **Optimized Approach**: A more efficient strategy involves using a frequency count of characters and then placing the characters with the highest frequency first. This ensures that we avoid placing the same characters next to each other.

   - **Frequency Check**: Determine if any character appears more than ⌊n/2⌋ times, where *n* is the length of the string. If so, return an empty string, as rearrangement is impossible.

   - **Greedy Strategy**: Use a max heap or priority queue to select characters by their frequency. If the heap is empty, it means all characters have been placed.

   - **Even-Odd Placement Strategy**: Another approach is to alternate characters in even and odd positions of the string.

3. **Why Choose the Final Approach?**: The greedy strategy with a max heap is chosen for its efficiency in handling large strings and ensuring that characters are distributed evenly.

### Corner Cases to Consider  
- **Frequency Greater Than ⌊n/2⌋**: If a character appears more than ⌊n/2⌋ times, it is impossible to rearrange the string to avoid adjacent duplicates.
- **Empty or Single-Character Strings**: These cases are trivial, as they either have no characters to rearrange or only one character, respectively.

### Solution
```python
def reorganizeString(s: str) -> str:
    # Get the frequency of each character
    freq = {}
    for char in s:
        if char in freq:
            freq[char] += 1
        else:
            freq[char] = 1

    # Check if any character's frequency exceeds ⌊(n+1)/2⌋
    n = len(s)
    for count in freq.values():
        if count > (n + 1) // 2:
            return ""

    # Create a sorted list of characters by their frequency
    sorted_chars = sorted(freq.items(), key=lambda x: x[1], reverse=True)

    # Use a result list to build the final string
    result = []
    while sorted_chars:
        # Place the two most frequent characters first
        first_char, first_count = sorted_chars.pop(0)
        if result and result[-1] == first_char:
            if not sorted_chars:
                return ""
            second_char, second_count = sorted_chars.pop(0)
            result.append(second_char)
            if second_count > 1:
                sorted_chars.append((second_char, second_count - 1))
            sorted_chars.append((first_char, first_count))
            sorted_chars.sort(key=lambda x: x[1], reverse=True)
        else:
            result.append(first_char)
            if first_count > 1:
                sorted_chars.append((first_char, first_count - 1))
            sorted_chars.sort(key=lambda x: x[1], reverse=True)

    return "".join(result)

```

### Time and Space Complexity Analysis  
- **Time Complexity**: O(n log n) due to sorting the characters by frequency, where *n* is the number of distinct characters. However, since *n* (the string length) dominates in most cases, the overall time complexity can be approximated as O(n log k), where *k* is the number of unique characters.
  
- **Space Complexity**: O(n) for storing the characters' frequencies and the resulting string.

### Potential Follow-up Questions  

1. **How would you handle this problem if the string contains characters outside the lowercase English alphabet?**  
   *Hint: Consider expanding the frequency count to handle different character types.*

2. **What if instead of ensuring no two adjacent characters are the same, we want to ensure that no two characters are more than a certain distance apart?**  
   *Hint: Use a similar greedy strategy but adjust the distance constraint.*

3. **Could you optimize the solution further by using a more efficient data structure?**  
   *Hint: Consider using a balanced binary search tree or a trie for more complex scenarios.*

### Summary  
This problem involves rearranging characters in a string to avoid adjacent duplicates, which can be solved using a greedy strategy with a max heap. The key insight is ensuring no character appears more than ⌊(n+1)/2⌋ times, making it a classic example of resource allocation and optimization problems. This pattern is commonly used in scheduling and resource distribution scenarios.

### Tags
Hash Table(#hash-table), String(#string), Greedy(#greedy), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Counting(#counting)

### Similar Problems
- Rearrange String k Distance Apart(rearrange-string-k-distance-apart) (Hard)
- Task Scheduler(task-scheduler) (Medium)
- Longest Happy String(longest-happy-string) (Medium)