### Leetcode 2972 (Hard): Count the Number of Incremovable Subarrays II [Practice](https://leetcode.com/problems/count-the-number-of-incremovable-subarrays-ii)

### Description  
Given an array of integers `nums`, **count the number of contiguous subarrays you can remove from `nums`** (removing a non-empty subarray, once) so that the remaining array is strictly increasing.  
A strictly increasing array is one where every next element is greater than the previous.  
You can only remove a single contiguous subarray (can also be prefix or suffix).  
Count all such ways you can remove a subarray to make the remaining elements strictly increasing.

### Examples  

**Example 1:**  
Input: `nums = [2,1,3,5,4,6]`  
Output: `10`  
*Explanation: You can remove any subarray that, after deletion, makes the result strictly increasing. For example, remove `nums` (get [1,3,5,4,6]), remove `nums[1:5]` ([2,6]), etc. In total, there are 10 such subarrays.*

**Example 2:**  
Input: `nums = [1,2,3,4,5]`  
Output: `15`  
*Explanation: The array is already strictly increasing. Any subarray removal (including removing the whole array) will leave a strictly increasing sequence (possibly empty), so all possible subarrays count: n*(n+1)/2 = 5*6/2 = 15.*

**Example 3:**  
Input: `nums = [5,4,3,2,1]`  
Output: `5`  
*Explanation: Only possible by removing full array except one element (remove all except one gives a trivially strictly increasing single-element array). Since array of length 1 is always strictly increasing, so number of ways = n = 5.*

### Thought Process (as if you’re the interviewee)  
To start, brute force would be:  
- Try all possible contiguous subarrays, remove them, and check if the remaining array is strictly increasing.  
- For an array of length n, try all subarrays `nums[l : r]` with 0 ≤ l ≤ r < n, remove them, and check the result — O(n³).

That's too slow for large arrays.  
Optimizing:
- We notice that only the join points between the prefix, "the part before the removed subarray," and the suffix, "the part after," can violate the strictly increasing property.
- Find all prefixes where nums[0..i] is strictly increasing — store the longest such prefix.
- Similarly, for all suffixes nums[j..n-1] strictly increasing — store for each j.
- For every possible (left,right) interval, where we remove nums[left..right], check if:  
    - The prefix up to left-1 is strictly increasing,
    - The suffix from right+1 is strictly increasing,
    - nums[left-1] and nums[right+1] (if both exist) maintain strictly increasing order.
- This can be checked in O(1) using precomputed arrays.
- Finally, sum all valid (left, right) pairs.

This yields O(n²) straightforwardly, but we can optimize to O(n):
- Since strictly increasing segments only split at violations, only a certain set of subarrays need to be considered.
- By scanning for longest increasing prefix/suffix, and two-pointer merging, we get an O(n) solution.

### Corner cases to consider  
- Array already strictly increasing (should return n×(n+1)/2).
- Array with all equal elements.
- Decreasing array.
- Single element and two-element arrays.
- Removing prefix/suffix.
- Removing the whole array.

### Solution

```python
def incremovable_subarrays(nums):
    n = len(nums)

    # Find the longest strictly increasing prefix
    l = 0
    while l + 1 < n and nums[l] < nums[l + 1]:
        l += 1

    # Already strictly increasing! All subarrays are "incremovable"
    if l == n - 1:
        return n * (n + 1) // 2

    # Find the longest strictly increasing suffix
    r = n - 1
    while r > 0 and nums[r - 1] < nums[r]:
        r -= 1

    # Make an array of prefix maxes
    prefix = [nums[0]]
    for i in range(1, n):
        if nums[i] > prefix[-1]:
            prefix.append(nums[i])
        else:
            break
    # Suffix mins similarly (not strictly needed)
    
    ans = 0
    # Try removing each subarray nums[i..j-1]
    # We want all 0 <= i <= j <= n, such that
    # the concatenation nums[0:i] + nums[j:n] is strictly increasing
    # For fixed i: find maximal j so that this holds
    r_ptr = r
    for l_ptr in range(l + 1):
        # For each prefix ending at l_ptr - 1 (i.e., prefix of length l_ptr)
        # Find how far r_ptr needs to move so that concat is strictly increasing
        while r_ptr < n and (l_ptr == 0 or nums[l_ptr - 1] < nums[r_ptr]):
            r_ptr += 1
        ans += n - r_ptr + 1

    return ans

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
    - One pass to find the longest prefix, another for suffix.
    - Scanning with two pointers for valid intervals is at most O(n).
- **Space Complexity:** O(1).  
    - Only variables and no extra arrays proportional to n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if not just strictly increasing but strictly decreasing?
  *Hint: Think about reversing the logic and using similar prefix/suffix checks.*

- How about allowing more than one subarray removal?
  *Hint: Requires dynamic programming.*

- Could you return the actual subarray indices?
  *Hint: Track (start, end) pairs for every valid removal.*

### Summary
This problem uses the two-pointer and prefix/suffix idea to efficiently check the number of valid "incremovable" subarrays.  
Strict prefix/suffix scanning and windowing is a common pattern for substring/subarray problems with constraints that depend on order, such as with strictly increasing/decreasing restrictions. This type of approach generalizes to problems involving merging sorted/range-based segments, dynamic programming for disjoint intervals, and greedy segment removals.


### Flashcard
For each possible subarray removal, check if the remaining array is strictly increasing by focusing on the join points between prefix and suffix.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search)

### Similar Problems
- Shortest Subarray to be Removed to Make Array Sorted(shortest-subarray-to-be-removed-to-make-array-sorted) (Medium)