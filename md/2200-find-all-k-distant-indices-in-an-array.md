### Leetcode 2200 (Easy): Find All K-Distant Indices in an Array [Practice](https://leetcode.com/problems/find-all-k-distant-indices-in-an-array)

### Description  
Given an integer array `nums`, and two integers `key` and `k`, a **k-distant index** is any index `i` such that there exists at least one index `j` with `|i - j| ≤ k` and `nums[j] == key`.  
Your task is to return **all k-distant indices** in increasing order.  
Think of it as: *For every index, does there exist a position within k distance whose value is equal to key?*  

### Examples  

**Example 1:**  
Input: `nums = [3,4,9,1,3,9,5]`, `key = 9`, `k = 1`  
Output: `[1,2,3,4,5,6]`  
*Explanation: Key occurs at 2 and 5. For each index within 1 step from 2 or 5 (i.e. indices 1–3 for 2 and 4–6 for 5), we collect those indices.*

**Example 2:**  
Input: `nums = [2,2,2,2]`, `key = 2`, `k = 2`  
Output: `[0,1,2,3]`  
*Explanation: The key is everywhere. For any index, there is certainly a `j` with `|i - j| ≤ 2` and `nums[j] == 2`.*

**Example 3:**  
Input: `nums = [1,2,3,4,5]`, `key = 6`, `k = 2`  
Output: `[]`  
*Explanation: The key is not present at all, so there are no k-distant indices. The result is empty.*

### Thought Process (as if you’re the interviewee)  
- The brute-force idea is: For every index `i`, scan all `j` (`0 ≤ j < n`), and if `|i - j| ≤ k` and `nums[j] == key`, then add `i` to the answer. But that’s O(n²).

- To optimize:
  - **Step 1:** Collect all indices `j` where `nums[j] == key`.
  - **Step 2:** For each such `j`, for all `i` in `[j - k, j + k]`, mark `i` (if `0 ≤ i < n`).
  - This processes only the windows around the key, and avoids unnecessary repeated scans, reducing to O(n).
  - For further optimization (if asked for checking for each i): Preprocess the key indices to a sorted list and for each i, binary search if any key-in-the-window exists, giving O(n log n).

- I’d choose the O(n) marking approach because it’s conceptually simplest and efficient enough for small `k` and moderate `n`.

### Corner cases to consider  
- Empty array (`nums = []`)
- `key` not present in `nums`
- All elements equal to `key`
- `k = 0`
- `k` larger than array size
- Duplicate key positions overlapping coverage windows, so output should not have duplicates
- One element array

### Solution

```python
def findKDistantIndices(nums, key, k):
    n = len(nums)
    marked = set()
    for j, val in enumerate(nums):
        if val == key:
            # Mark indices from max(0, j - k) to min(n - 1, j + k)
            left = max(0, j - k)
            right = min(n - 1, j + k)
            for i in range(left, right + 1):
                marked.add(i)
    return sorted(marked)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k) worst-case if many keys and large k, but typically closer to O(n).  
  - Scans the array once to find keys, then for each key marks at most 2k+1 indices each.
- **Space Complexity:** O(n) for the set of all possible marked indices (in the worst case, like all elements are key).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve it for much larger arrays and very small `k`, possibly avoiding a set entirely?
  *Hint: Use a boolean array or two pointers to mark, or sweep only once.*

- What if we want to count how many k-distant keys there are for each index, not just if any exist?
  *Hint: Use prefix sums to aggregate coverage as you mark ranges.*

- Can this be solved in a single scan, without extra storage for marking?
  *Hint: Use a sliding window of recent key positions while iterating.*

### Summary
This is a classic **window marking** or **range inclusion** problem for each key position. We leverage a set or boolean array for deduplication, and it falls under **array sweep** or **interval union** patterns—common in range-update and "for every position, can it be 'covered' by some special event?" style interview questions. The marking and then sorting/deduplication pattern is frequently used for such "distance from special position" array problems.


### Flashcard
For each index, check if any key is within k positions; optimize by first collecting all key positions, then marking all indices within k of each key, avoiding repeated scans.

### Tags
Array(#array), Two Pointers(#two-pointers)

### Similar Problems
- Two Sum(two-sum) (Easy)
- Shortest Word Distance(shortest-word-distance) (Easy)
- Minimum Absolute Difference Between Elements With Constraint(minimum-absolute-difference-between-elements-with-constraint) (Medium)