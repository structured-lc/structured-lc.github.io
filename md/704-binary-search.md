### Leetcode 704 (Easy): Binary Search [Practice](https://leetcode.com/problems/binary-search)

### Description  
You are given a sorted (ascending) array of integers `nums` and an integer `target`.  
Design a function to search for `target` in `nums` using **binary search**—that is, always search a sorted region by comparing the middle value.  
If the `target` is found, return its index; if not, return -1.  
You can assume all elements in `nums` are unique.

### Examples  

**Example 1:**  
Input: `nums = [-1,0,3,5,9,12]`, `target = 9`  
Output: `4`  
*Explanation: The value 9 exists at index 4 in nums. Binary search would check the middle (index 2, value 3), move right (index 4), and find 9.*

**Example 2:**  
Input: `nums = [-1,0,3,5,9,12]`, `target = 2`  
Output: `-1`  
*Explanation: Value 2 does not exist in nums. Binary search would check the middle, rule out both halves, and exhaust the search range — so output is -1.*

**Example 3:**  
Input: `nums = [2,4,6,8,10,12,14]`, `target = 6`  
Output: `2`  
*Explanation: 6 is at index 2. Binary search would check mid-point, maybe 8, move left, then find 6.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Scan each element left to right, compare with `target`.  
  Time: O(n) — not acceptable for large inputs, especially since the array is sorted.

- **Optimized approach:**  
  Use **binary search** to exploit the sorted property.  
  - Set two pointers: `low = 0`, `high = n-1`.
  - While `low ≤ high`:
    - Compute middle: `mid = low + (high - low) // 2`
    - If `nums[mid] == target`, return `mid`.
    - If `nums[mid] < target`, move `low` to `mid + 1` (right half).
    - If `nums[mid] > target`, move `high` to `mid - 1` (left half).
  - If not found, return -1.

- This approach always halves the search space each step, leading to O(log n) time.
- **Trade-offs:**  
  - Simple, efficient, zero extra space.
  - Requires array to be sorted.

### Corner cases to consider  
- Empty array: `nums = []` — should return -1.
- Single element (target exists): e.g., `nums = [3]`, `target = 3` — should return 0.
- Single element (target doesn’t exist): `nums = [3]`, `target = 5` — should return -1.
- Target at the first (0) or last (n-1) position.
- Target not present but larger/smaller than all elements.
- Large arrays (performance).

### Solution

```python
def search(nums, target):
    # Set up pointers to start and end of array
    low = 0
    high = len(nums) - 1

    # Perform binary search
    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target:
            return mid  # found target
        elif nums[mid] < target:
            low = mid + 1  # move right
        else:
            high = mid - 1  # move left

    # Target not found
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n)  
  At each step, we halve the search interval. In the worst case (target not found or at one end), we repeat until the interval shrinks to zero.
- **Space Complexity:** O(1)  
  Only a fixed number of pointers/variables are used, no extra space dependent on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array was **sorted in descending order**?  
  *Hint: Consider reversing the logic for left/right halves.*

- How would you **find the leftmost or rightmost occurrence** of the target if duplicates exist?  
  *Hint: Change the condition when target is found, keep searching left/right.*

- Can you **apply binary search to search in a rotated sorted array**?  
  *Hint: Identify which part is sorted and narrow the search accordingly.*

### Summary
The solution demonstrates the classic **binary search** pattern—a key technique for sorted arrays and logarithmic search problems.  
It is fundamental in coding interviews and applies wherever you need efficient search over ordered data, such as searching in search trees, finding insert positions, or searching ranges with monotonic properties.


### Flashcard
Use binary search on the sorted array: repeatedly halve the search range until you find the target or exhaust the array.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Search in a Sorted Array of Unknown Size(search-in-a-sorted-array-of-unknown-size) (Medium)
- Maximum Count of Positive Integer and Negative Integer(maximum-count-of-positive-integer-and-negative-integer) (Easy)