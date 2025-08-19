### Leetcode 2134 (Medium): Minimum Swaps to Group All 1's Together II [Practice](https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii)

### Description  
Given a binary circular array (contains only 0's and 1's; first and last are adjacent), return the **minimum number of swaps** needed to group all 1's together *anywhere* in the array.  
A swap means you can exchange any two distinct positions in the array (not necessarily adjacent).

You want all the 1's in the array to be consecutive, allowing the group to "wrap around" from the end back to the start.

### Examples  

**Example 1:**  
Input: `nums = [0,1,0,1,1,0,0]`  
Output: `1`  
Explanation: The array has four 1’s. If you swap index 0 and index 3 (`[1,1,0,0,1,0,0]`), all ones are together in a wraparound window, needing only 1 swap.

**Example 2:**  
Input: `nums = [0,1,1,1,0,0,1,1,0]`  
Output: `2`  
Explanation: One way: swap index 0 and 3 (`[1,1,1,0,0,0,1,1,0]`), then index 4 and 6 (`[1,1,1,1,0,0,0,1,0]`). Two swaps needed.

**Example 3:**  
Input: `nums = [1,1,0,0,1]`  
Output: `0`  
Explanation: All ones are already next to each other when allowing wraparound: `[1,1,0,0,1]` (indices 4,0,1 touch due to circular nature). No swaps required.


### Thought Process (as if you’re the interviewee)  

- **Brute force idea:**  
  Try all possible groupings of 1's (i.e., every window of size equal to number of 1's), count how many 0’s are in each window (since they must become 1’s via swap), and take the minimum.  
  O(n²) if done naively: for every possible window, count zeros.

- **Circularity issue:**  
  The array is *circular*, so window can wrap from end to start. To handle this with a standard sliding window, you can duplicate the array—i.e., work with nums + nums—so that any circular window of original length n can be seamlessly found in the doubled array.

- **Optimized approach (Sliding Window):**  
  1. Count total number of 1's in nums: call this k.
  2. Concatenate nums with itself to handle wraparounds.
  3. Slide a window of length k across nums + nums, find window with *fewest* zeros.
  4. That minimum is the answer: minimum zeros = minimum swaps needed.
  
  This is O(n) since you just run a sliding window over an array of length 2n once.

- **Trade-offs:**  
  Only O(n) time and O(n) space (due to array duplication), which is fast and easy to code in interviews.

### Corner cases to consider  
- Empty array (should return 0).
- All 1's (already grouped, swaps = 0).
- All 0's (k = 0; swaps = 0).
- Single element array.
- Multiple 1's already together, touching beginning/end (test wraparound logic).


### Solution

```python
def minSwaps(nums):
    # Step 1: Count total number of 1's
    k = sum(nums)
    n = len(nums)
    if k == 0 or k == n:
        # No swaps needed if all 0 or all 1
        return 0

    # Step 2: Duplicate the array to handle circular windows
    nums2 = nums + nums

    # Step 3: Sliding window of size k, count number of 0's in each window
    # We want the minimum number of 0's in any window of size k
    zeros_in_window = 0
    min_zeros = float('inf')

    # Count zeros in first window
    for i in range(k):
        if nums2[i] == 0:
            zeros_in_window += 1
    min_zeros = zeros_in_window

    # Slide the window
    for i in range(k, 2 * n):
        if nums2[i] == 0:
            zeros_in_window += 1
        if nums2[i - k] == 0:
            zeros_in_window -= 1
        min_zeros = min(min_zeros, zeros_in_window)

    return min_zeros
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we only traverse the doubled array once with a window of fixed size.
- **Space Complexity:** O(n), needed for duplicating the array; all other variables use constant space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array was not circular?
  *Hint: Remove array duplication; only slide within the original array.*

- Can you do the solution in O(1) extra space?
  *Hint: Simulate window modulus math, avoid array duplication.*

- What if swaps could only be between adjacent elements?
  *Hint: It resembles minimum adjacent swaps for grouping ones, which is a different (and harder) problem.*

### Summary
This is a classic **sliding window** pattern, extended to circular data by **array duplication**. It's O(n) and extremely efficient.  
This technique can be applied to many window-based search or counting problems on circular arrays, including maximum/minimum sums, grouping characters, or subarray/window-based optimizations.

### Tags
Array(#array), Sliding Window(#sliding-window)

### Similar Problems
- Minimum Swaps to Group All 1's Together(minimum-swaps-to-group-all-1s-together) (Medium)
- Time Needed to Rearrange a Binary String(time-needed-to-rearrange-a-binary-string) (Medium)