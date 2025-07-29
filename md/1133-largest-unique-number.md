### Leetcode 1133 (Easy): Largest Unique Number [Practice](https://leetcode.com/problems/largest-unique-number)

### Description  
Given an array of integers, find the largest integer that appears only once. If no such integer exists, return -1.  
Put simply: scan the array, count how many times each number appears, and return the biggest number that shows up exactly once.

### Examples  

**Example 1:**  
Input=`[5,7,3,9,4,9,8,3,1]`  
Output=`8`  
Explanation: 9 is the maximum but it repeats. 8 occurs only once and is the largest unique number.

**Example 2:**  
Input=`[9,9,8,8]`  
Output=`-1`  
Explanation: All numbers repeat; no unique number exists.

**Example 3:**  
Input=`[1]`  
Output=`1`  
Explanation: Only one element, which is unique.

### Thought Process  
**Brute-force:**  
Count the frequency of each number by iterating through the array and checking how many times each number appears. Then, collect all numbers with count = 1 and return the maximum, or -1 if none.

**Optimized:**  
Use a hash table (dictionary) to count frequencies in one pass. Then, iterate through the dictionary to find all numbers with count = 1. If found, return the maximum; else, return -1.  
This approach is optimal because both steps are O(N) in time and space, and it’s easy to understand.

**Why this approach:**  
It efficiently leverages hashing for frequency counting, a common pattern for problems involving counts or uniqueness. The space overhead is acceptable given the problem constraints, and the solution is clear and maintainable.

### Corner cases to consider  
- Empty array (per problem constraints, array length ≥ 1, but worth noting for general cases).
- All elements same (no unique number).
- Single element (trivially unique).
- Multiple unique numbers, need to pick the largest.
- All unique numbers (trivial maximum).
- Large array (but within given constraints).

### Solution

```python
def largestUniqueNumber(nums):
    freq = {}  # dictionary to count frequency of each number
    for num in nums:
        freq[num] = freq.get(num, 0) + 1
    
    candidates = [num for num, cnt in freq.items() if cnt == 1]
    return max(candidates) if candidates else -1
```
- **Line-by-line explanation:**  
  - Build a frequency dictionary for all numbers in the input list.
  - Collect all numbers that appear exactly once.
  - If there are such numbers, return the maximum; otherwise, return -1.

### Time and Space complexity Analysis  
- **Time Complexity:** O(N) — We traverse the list once to build the frequency map, and once more through the unique numbers to find the maximum.
- **Space Complexity:** O(N) — In the worst case, all numbers are unique, so we store up to N entries in the dictionary.

### Potential follow-up questions  
How would you optimize if the input range is small (e.g., 0 ≤ A[i] ≤ 1000)?  
  *Hint: Use an array of size 1001 instead of a hash table for counting.*  
What if you must solve it in O(1) space?  
  *Hint: Sorting could help, but time complexity may increase to O(N log N).*  
How would you handle streaming data where you can’t store the whole array?  
  *Hint: Think about maintaining a running count of unique numbers and their frequencies.*

### Summary  
This problem trains you to use hash tables for counting frequencies—a fundamental technique in array and string manipulation. The pattern is widely used in problems involving uniqueness, duplicates, or majority elements. The approach is efficient and clear, and similar logic applies to other “count and filter” problems.