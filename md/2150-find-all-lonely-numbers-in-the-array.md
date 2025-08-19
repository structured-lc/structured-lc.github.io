### Leetcode 2150 (Medium): Find All Lonely Numbers in the Array [Practice](https://leetcode.com/problems/find-all-lonely-numbers-in-the-array)

### Description  
You are given an integer array called `nums`. A number x is **lonely** if:
- x appears **exactly once** in `nums`, and
- **Neither** x - 1 nor x + 1 appear in `nums`.

Find and return **all** lonely numbers in the array. The result can be in any order.

### Examples  

**Example 1:**  
Input: `[10, 6, 5, 8]`  
Output: `[10, 8]`  
*Explanation:*
- 10: appears once, 9 and 11 not in array ⇒ lonely.
- 8: appears once, 7 and 9 not in array ⇒ lonely.
- 6: 5 is present ⇒ not lonely.
- 5: 6 is present ⇒ not lonely.

**Example 2:**  
Input: `[1, 3, 5, 3]`  
Output: `[1, 5]`  
*Explanation:*
- 1: appears once, 0 and 2 not in array ⇒ lonely.
- 3: appears twice ⇒ not lonely.
- 5: appears once, 4 and 6 not in array ⇒ lonely.

**Example 3:**  
Input: `[4, 4, 4]`  
Output: `[]`  
*Explanation:*
- All values appear more than once ⇒ no lonely numbers.

### Thought Process (as if you’re the interviewee)  

- **Brute-Force:**  
  For each element x in `nums`, check if x occurs once, and if x-1 or x+1 are NOT present.  
  To do this efficiently, we need to:
  1. **Count occurrences** of each number (so we know which numbers appear once).
  2. **Check neighbor existence** (x-1 and x+1).

- **Optimized Approach:**  
  - Use a dictionary to count frequencies of all numbers.
  - For every unique number with frequency 1, check if its immediate neighbors exist in the dictionary.
  - If both do **not** exist, add to answer.
  - All operations are O(1) per check due to hash tables.
  - Iterate through unique numbers only, not every occurrence.

- **Trade-offs:**  
  - Time: O(n), where n is the length of the array.
  - Space: O(k), where k is the count of unique numbers.
  - Very efficient for large arrays with many duplicates or unique values.

### Corner cases to consider  
- Empty array → output should be [].
- All numbers appear more than once → output should be [].
- All numbers have neighbors present → output should be [].
- Only one distinct value in array → output should be [] if frequency >1, [x] if frequency == 1.
- Numbers at extremes, e.g. , [10⁶], check for integer boundaries.

### Solution

```python
def findLonely(nums):
    # Step 1: Count frequency of each number
    freq = {}
    for num in nums:
        if num in freq:
            freq[num] += 1
        else:
            freq[num] = 1

    ans = []
    # Step 2: For every key in freq, check the loneliness condition
    for num in freq:
        # Must appear exactly once
        if freq[num] == 1:
            # Neither neighbor exists in the freq dictionary
            if (num - 1) not in freq and (num + 1) not in freq:
                ans.append(num)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Iterate once to build count dictionary: O(n).  
  - Second loop over unique numbers (≤ n): O(n).  
  - All checks and dictionary operations are O(1).
- **Space Complexity:** O(k)  
  - Where k is the number of distinct elements (bounded by n and the number range).  
  - Extra storage used for the frequency map and result list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want the lonely numbers **sorted** in the result?  
  *Hint: Can use `sorted(ans)` before returning.*

- How would your approach change if the array is **streamed** (very large, can't fit in memory)?  
  *Hint: Need external hashing, map-reduce, or sliding window approximations.*

- Could you solve this **in-place** with less extra space if `nums` can be mutated?  
  *Hint: Try in-place bucket marking or linking with sentinel values when possible.*

### Summary
This problem leverages the **counting** and **hashing** patterns—first, count all elements (hash map/dictionary), then filter by frequency and neighbor criteria. It’s a classic scanning/filtering pattern, useful for problems where element frequency and neighborhood conditions apply (e.g., "lonely" or "unique" with constraints). Similar methodology is seen in problems like "single number", "majority element", and "unique number in a range".

### Tags
Array(#array), Hash Table(#hash-table), Counting(#counting)

### Similar Problems
- Frequency of the Most Frequent Element(frequency-of-the-most-frequent-element) (Medium)