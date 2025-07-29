### Leetcode 2190 (Easy): Most Frequent Number Following Key In an Array [Practice](https://leetcode.com/problems/most-frequent-number-following-key-in-an-array)

### Description  
Given a 0-indexed array of integers `nums` and an integer `key` (guaranteed to appear in `nums`), return the number (`target`) that occurs **most frequently immediately after** an occurrence of `key`.  
For each index `i` (0 ≤ i < len(nums)-1), if `nums[i] == key`, count `nums[i+1]` as a candidate. Return the candidate with the highest count. It is guaranteed there will be a unique answer.

### Examples  

**Example 1:**  
Input: `nums = [1,100,200,1,100], key = 1`  
Output: `100`  
*Explanation: The only immediate followers of key=1 are at positions 1 and 4 (after 1 at indices 0 and 3). Both are 100, so output is 100.*

**Example 2:**  
Input: `nums = [2,2,2,2,3], key = 2`  
Output: `2`  
*Explanation: Key occurs at indices 0,1,2,3. The next numbers are 2,2,2,3. 2 follows key 3 times, 3 follows it once. So, output is 2.*

**Example 3:**  
Input: `nums = [8,8,1,8,2,2,8,2,1], key = 8`  
Output: `2`  
*Explanation: key=8 at indices 0,1,3,6. The numbers after those indices are 8,1,2,2. 2 occurs twice after 8; 8 and 1 occur once each. So, output is 2.*

### Thought Process (as if you’re the interviewee)  
Start by iterating through `nums`. For each index, check if `nums[i]` equals `key`. If so, increment a counter for `nums[i+1]` (the immediate follower).  
After collecting all counts, identify which `target` has the highest count and return it.  
Brute-force would be maintaining a hash map (or a small fixed array, since values ≤1000) for counts.

An optimization can simply use an array of size 1001 (since all values are ≤1000).  
This traversal is O(n) and meets all constraints efficiently.

### Corner cases to consider  
- Smallest case: length 2 (e.g. [x, y], key = x)
- All followers of key are the same
- `key` occurs only once
- `key` occurs multiple times, with multiple distinct followers
- Last item is not relevant as it cannot be a follower
- Array could be all the same number (e.g. [5,5,5,5], key = 5)

### Solution

```python
def most_frequent(nums, key):
    # Array to track frequencies of each possible value (since 1 ≤ nums[i] ≤ 1000)
    freq = [0] * 1001

    # Iterate through indices 0 to len(nums)-2 (since we look ahead by 1)
    for i in range(len(nums) - 1):
        if nums[i] == key:
            freq[nums[i + 1]] += 1

    # Find the value with the highest frequency
    max_count = 0
    ans = 0
    for val in range(1, 1001):  # all valid nums[i] values
        if freq[val] > max_count:
            max_count = freq[val]
            ans = val

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(nums). We iterate once through `nums`, then once through the fixed-size 1001 array to find the max.
- **Space Complexity:** O(1), since the frequency array is of fixed length (1001 elements), independent of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if `key` might not be present in `nums`?  
  *Hint: How would you signal “not found” or avoid errors?*

- If there could be multiple numbers tying for max count, how would you handle returning all of them?  
  *Hint: Can you adapt your selection loop for ties?*

- How would you handle very large numbers (e.g., `nums[i]` up to 10⁹)?  
  *Hint: What data structure would you use instead of a fixed array?*

### Summary  
The approach is a classic **linear scan with frequency counting**—a typical pattern for finding most/least frequent elements in a list, or following a particular event.  
Using an array as a frequency map leverages the limited possible values for O(1) space and fast lookups. This pattern generalizes to problems like finding the most common adjacent pair, or other fixed-range counting questions.