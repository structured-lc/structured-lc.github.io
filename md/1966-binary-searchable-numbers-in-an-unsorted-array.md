### Leetcode 1966 (Medium): Binary Searchable Numbers in an Unsorted Array [Practice](https://leetcode.com/problems/binary-searchable-numbers-in-an-unsorted-array)

### Description  
Given an integer array `nums` with unique elements (not necessarily sorted), consider a binary search-like function:  
- Repeatedly, a **random element** is chosen as pivot.  
- If pivot equals target, return true.  
- If pivot < target, remove the pivot and all elements to its left.  
- If pivot > target, remove the pivot and all elements to its right.  
Which numbers in `nums` are **guaranteed to be found**, regardless of pivot choices? Return the count of such **binary searchable** numbers in `nums`.

In other words:  
A number is **binary searchable** if, for every prefix to its left, all are ≤ it, and every suffix to its right, all are ≥ it. This ensures it cannot be "eliminated" in the worst case for any pivot choice.

### Examples  

**Example 1:**  
Input: `[1,3,2]`  
Output: `1`  
*Explanation: Only 1 is binary searchable.  
- 1: no left elements; right: [3,2] ≥ 1, true.  
- 3: left [1]; 3 > 1 OK. Right [2]; 2 < 3 fails.*  

**Example 2:**  
Input: `[2,1,3,5,4]`  
Output: `2`  
*Explanation:  
- 2: left none, right [1,3,5,4] ≥ 2? No: 1 < 2, so not binary searchable.  
- 1: left [2]: 2 > 1, bad.  
- 3: left [2,1]: both < 3 OK. Right [5,4]: both > 3 OK, so 3 is binary searchable.  
- 5: left [2,1,3]: all < 5 OK. Right [4]: 4 < 5, so fails.  
- 4: left [2,1,3,5]: all < 4? 5 > 4 so fails.*  

**Example 3:**  
Input: `[1,2,3,4]`  
Output: `4`  
*Explanation: Array is sorted increasing — every number is binary searchable.  
All left values < current, all right > current for all elements.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea**:  
  For each number at index i, check every number to the left (indices 0..i-1) is ≤ nums[i],  
  and every number to the right (indices i+1..n-1) is ≥ nums[i].  
  If both conditions are true for i, count it as binary searchable.  
  This is O(n²), not efficient for large arrays.

- **Optimization**:  
  Instead of checking every time, precompute:  
  - For each index, the **maximum** to the left (`maxLeft[i]` = max(nums[0..i-1]))  
  - For each index, the **minimum** to the right (`minRight[i]` = min(nums[i+1..n-1]))  
  Then for i, if `nums[i] ≥ maxLeft[i]` and `nums[i] ≤ minRight[i]`, i is binary searchable.  
  This can be done with two passes O(n).

- **Trade-offs**:  
  This approach uses O(n) additional space for the precomputed arrays, but is O(n) in time.  
  This is necessary for a single scan; it is efficient and clean for interview code.

### Corner cases to consider  
- Empty array (`[]`): should return 0.  
- One element (`[a]`): should return 1 (trivially searchable).  
- All strictly increasing ([1,2,3]): all elements are binary searchable.  
- All strictly decreasing ([5,3,1]): only first element (since all right > it is false for the other elements).  
- Equal elements (problem says all numbers are unique).  
- Values with minimum/maximum at non-edge positions.  
- Array of size two.

### Solution

```python
def binarySearchableNumbers(nums):
    n = len(nums)
    if n == 0:
        return 0

    # maxLeft[i] – maximum value among nums[0..i-1]
    maxLeft = [float('-inf')] * n
    currentMax = float('-inf')
    for i in range(n):
        maxLeft[i] = currentMax
        currentMax = max(currentMax, nums[i])

    # minRight[i] – minimum value among nums[i+1..n-1]
    minRight = [float('inf')] * n
    currentMin = float('inf')
    for i in reversed(range(n)):
        minRight[i] = currentMin
        currentMin = min(currentMin, nums[i])

    count = 0
    for i in range(n):
        if nums[i] >= maxLeft[i] and nums[i] <= minRight[i]:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Two linear scans for precomputing maxLeft/minRight and one to count.
- **Space Complexity:** O(n) — For the maxLeft and minRight arrays. Input is not modified; extra storage grows with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if all elements are not unique?  
  *Hint: How would duplicates affect the guarantees and the min/max comparison logic?*

- Can you find the indices of all binary searchable numbers, not just the count?  
  *Hint: Slightly modify your code to collect indices instead of just a count.*

- Can you solve it in O(1) space?  
  *Hint: It's possible to scan from both ends, but you’ll lose random access for checking; is that OK?*

### Summary
This approach uses the common **precompute prefix max / suffix min** pattern, which lets us answer range max/min queries in O(1) time after an O(n) setup. This technique turns a brute-force O(n²) problem into an O(n) problem. It's applicable in a wide variety of "for each position, compare with all left/right" type problems, such as trapped water, leaders in array, and stock price questions.


### Flashcard
Precompute maxLeft[i] and minRight[i]; count positions where nums[i] > maxLeft[i] and nums[i] < minRight[i], meaning it could be found by binary search.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
