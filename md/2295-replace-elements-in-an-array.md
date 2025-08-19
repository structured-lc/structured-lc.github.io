### Leetcode 2295 (Medium): Replace Elements in an Array [Practice](https://leetcode.com/problems/replace-elements-in-an-array)

### Description  
Given an integer array `nums` with unique elements, and an array of operations where each operation contains a pair `[old, new]`, replace every occurrence of `old` in `nums` with `new`, in the order given by operations.

- Each `old` is guaranteed to exist when its operation is processed.
- No `new` value will already be present in `nums` at the time of replacement.
- The final output is the updated `nums` after all replacements.

### Examples  

**Example 1:**  
Input: `nums = [1,2,4,6]`, `operations = [[1,3],[4,7],[6,1]]`  
Output: `[3,2,7,1]`  
*Explanation:*
- Replace `1` with `3`: `[3,2,4,6]`
- Replace `4` with `7`: `[3,2,7,6]`
- Replace `6` with `1`: `[3,2,7,1]`

**Example 2:**  
Input: `nums = [10,3,9,7]`, `operations = [[10,5],[3,15],[9,7],[7,6]]`  
Output: `[5,15,7,6]`  
*Explanation:*
- Replace `10` with `5`: `[5,3,9,7]`
- Replace `3` with `15`: `[5,15,9,7]`
- Replace `9` with `7`: `[5,15,7,7]`
- Replace `7` with `6` (at index 3): `[5,15,7,6]`

**Example 3:**  
Input: `nums = [2,1]`, `operations = [[2,3],[1,4],[3,2],[4,1]]`  
Output: `[2,1]`  
*Explanation:*
- Replace `2` with `3`: `[3,1]`
- Replace `1` with `4`: `[3,4]`
- Replace `3` with `2`: `[2,4]`
- Replace `4` with `1`: `[2,1]`

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each operation, scan `nums` to find and update every occurrence of `old` with `new`. This is O(m·n) time, which is too slow for large inputs.
- **Optimization:** Since all elements in `nums` are unique, and all replacements also assign unique values, we can use a hash map to maintain the current position of each value.
    - Build `value → index` mapping for `nums`.
    - For each operation `[old, new]`:
        - Use the map to find the index of `old` in O(1).
        - Assign `nums[index] = new`.
        - Update the hash map by removing `old` and inserting `new` at that index.
- **Why this works:** Each `old` is guaranteed to exist when replaced, and after every operation the hash map always represents current values' positions.

### Corner cases to consider  
- Empty `nums` or operations: Nothing to change; should return empty array or unchanged.
- Only one element: Operations still work.
- Operations that "swap back" values (chain of ops cycles back to original): Should still produce correct final array.
- No operations: Should return input `nums` as is.

### Solution

```python
def arrayChange(nums, operations):
    # Build number → index mapping for fast lookup
    num_to_index = {num: i for i, num in enumerate(nums)}
    # Process each operation in order
    for old, new in operations:
        idx = num_to_index[old]
        nums[idx] = new
        del num_to_index[old]
        num_to_index[new] = idx
    return nums
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = len(nums) and m = number of operations. 
  - O(n) for building the initial map.
  - O(1) per operation due to hash map lookups and updates, so total O(m).
- **Space Complexity:** O(n) for the hash map that stores the positions for all current values in `nums`.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `nums` contains duplicate elements?
  *Hint: Should mapping be value → list of indexes? What if multiple replacements could be required per operation?*

- Can you perform the operations if you had to handle very large `nums` with limited memory?
  *Hint: Would a sparse representation or lazy updates help?*

- How would you modify the solution if some operations may not find their `old` value because of earlier replacements?
  *Hint: Check and safely skip or handle not-found operations.*

### Summary
This problem is a classic use case for a *hash map* (dictionary) to maintain mapping from values to indices, allowing O(1) updates and lookups. It's an example of "offline queries" applied efficiently, showing that preprocessing + smart data structures can often beat brute force. The approach also appears in similar problems like dynamic index/value updates, swap/replace operations, and mapping-based simulations.

### Tags
Array(#array), Hash Table(#hash-table), Simulation(#simulation)

### Similar Problems
- Find All Numbers Disappeared in an Array(find-all-numbers-disappeared-in-an-array) (Easy)
- Maximum Number of Integers to Choose From a Range I(maximum-number-of-integers-to-choose-from-a-range-i) (Medium)
- Maximum Number of Integers to Choose From a Range II(maximum-number-of-integers-to-choose-from-a-range-ii) (Medium)