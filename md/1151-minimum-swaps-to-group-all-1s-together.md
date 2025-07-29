### Leetcode 1151 (Medium): Minimum Swaps to Group All 1's Together [Practice](https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together)

### Description  
Given a binary array, group all the 1's together anywhere in the array by performing the minimum number of adjacent swaps. Each swap moves any two **adjacent** elements. Your task: return the smallest number of swaps to make all the 1's appear consecutively (in any position).  
Think of moving the 1's as a sliding window; you want all 1's in a continuous block, moving as few 1's as possible.

### Examples  

**Example 1:**  
Input: `[1,0,1,0,1]`  
Output: `1`  
*Explanation: There are three possible ways to group all 1's together:*  
- `[1,1,1,0,0]` using 1 swap  
- `[0,1,1,1,0]` using 2 swaps  
- `[0,0,1,1,1]` using 1 swap  
The minimum is `1`.

**Example 2:**  
Input: `[0,0,0,1,0]`  
Output: `0`  
*Explanation: Since there is only one 1 in the array, no swaps needed.*

**Example 3:**  
Input: `[1,0,1,0,1,0,0,1,1,0,1]`  
Output: `3`  
*Explanation: Group all 1's together—one possibility is `[0,0,0,0,0,1,1,1,1,1,1]`, which takes 3 swaps.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible subarrays of length K (where K = total number of 1's), count how many zeros are in each window, pick the window with the least zeros. Each zero in the window represents a misplaced '0' when we try to collect all 1's together, so that's the number of swaps needed for this window. This is O(n⋅k).

- **Optimized (Sliding Window):**  
  Since finding the minimum swaps equals finding the window of size K containing the most 1's, I can:
  - Count total 1's in array → K.
  - Slide a window of size K over `data`, for each window count the number of 1's inside. The number of swaps for this window is K - (number of 1's in window).
  - Keep track of the *maximum* number of 1's found in any window.  
  The answer will be `K - max_ones_in_window`.
  - This works in O(n) time.

- **Why?**  
  Each window of size K can, at best, keep X 1's in place (no need to move them out), the rest (K-X) 1's must be swapped in. So fewer 1's in the window, more swaps needed.

### Corner cases to consider  
- The whole array is all 1's: zero swaps needed.
- Array has only 1 element (either 0 or 1).
- All zeros, no 1's: zero swaps needed.
- All 1's are already consecutive: zero swaps needed.
- 1's scattered with only single 1's: swaps may still be zero if K = 1.

### Solution

```python
def minSwaps(data):
    # Step 1: Count total number of 1's (k)
    k = sum(data)
    if k == 0 or k == len(data):
        return 0  # No swaps needed
    
    # Step 2: Sliding window of size k to find window with most 1's
    max_ones = curr_ones = sum(data[:k])
    left = 0
    for right in range(k, len(data)):
        # Slide window: Remove data[left], add data[right]
        curr_ones += data[right] - data[left]
        max_ones = max(max_ones, curr_ones)
        left += 1
    
    # Step 3: Answer is k - max_ones in any window
    return k - max_ones
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  *Justification: One pass to count 1's, one pass for sliding window—both linear.*

- **Space Complexity:** O(1)  
  *Justification: Only a few integer variables for bookkeeping. No extra storage proportional to input size.*

### Potential follow-up questions (as if you’re the interviewer)  

- What if swaps weren't restricted to adjacent elements?
  *Hint: Think about non-adjacent swaps and their costs. This might reduce the answer to zero in one operation if sorting is allowed.*

- Can you solve this problem for a circular array (wrapping around)?
  *Hint: Extend the array to size 2n and slide a window of size k over the extended array.*

- How would you modify the approach if the array contained values other than 0 or 1?
  *Hint: Need to generalize the "target value" and the sliding window's contents accordingly.*

### Summary
This problem is a classic use of the **sliding window** pattern. We convert a minimum-swap operation into finding the window with the highest number of already-in-place items (in this case, 1's) and compute how many elements are out of place. This pattern can be applied in problems involving grouping, such as maximum consecutive subarrays, or minimizing changes/swaps to meet some grouping criteria.