### Leetcode 2560 (Medium): House Robber IV [Practice](https://leetcode.com/problems/house-robber-iv)

### Description  
Given a row of houses, each with some amount of money (`nums[i]`), you are a robber who refuses to rob two adjacent houses. You **must** rob at least `k` houses. The twist: you want to **minimize your risk** — so your "capability" is defined as the **maximum** amount of money you steal from any one house during your heist. Your goal is to choose which houses to rob (no two adjacent) so that you rob at least `k` houses, and the *highest* money amount among your robbed houses is minimized.

### Examples  

**Example 1:**  
Input: `nums = [2,3,5,9], k = 2`  
Output: `5`  
*Explanation:  
Possible non-adjacent pairs: (2,5), (2,9), (3,9), (3,5), (5,9), (2,3), (3,5), (2,9).   
The way to minimize the "capability" is to rob houses at index 0 and 2 (2 and 5). The maximum amount robbed in any selected house = 5.*

**Example 2:**  
Input: `nums = [2,7,9,3,1], k = 2`  
Output: `2`  
*Explanation:  
It is possible to rob houses at index 0 and 3 (2 and 3), so the largest stolen from any single house is 3. However, robbing only house at index 0 with value 2 is not sufficient since k=2. The minimal maximum among any valid set is 2 in this case (using indices 0 and 4: 2,1).*

**Example 3:**  
Input: `nums = [2,3,4,5], k = 2`  
Output: `3`  
*Explanation:  
Possible to select houses 0 and 2 (2 and 4) → max = 4, houses 0 and 3 (2 and 5) → max = 5, houses 1 and 3 (3 and 5) → max = 5, houses 0 and 1 (2 and 3) → max = 3 (but they are adjacent so not allowed).   
So the minimal max is 3 by robbing houses 0 and 2 (2 and 4), but since 4>3, we check possible lower picks, but not possible.  
So, capability 3: only house 1 is ≤3, need k=2, not possible  
Capability 4: houses 0 and 2 → possible, max=4.  
So output: 4.  
(If you follow through with a binary search, you'll see capability 4 works, but 3 doesn't.)*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Try every subset of homes, making sure:  
  • No two chosen are adjacent  
  • Subset size ≥ k  
  • Track the maximum in the subset (the "capability")  
  Return the minimum such capability.  
  **Problem:** Too slow for n up to 10⁵.

- **Optimized approach:**  
  Notice that as you *increase* the allowed capability, it becomes *easier* to rob at least k houses.  
  Thus, the minimal capability can be searched with **binary search**:  
  • For a given candidate capability C, can I pick ≥k non-adjacent houses, all ≤C?  
  This part can be solved greedily:  
    - Traverse `nums`, for each house ≤C, pick if previous wasn't picked, ensuring we don't pick adjacent.  
  This gives O(n log(max(nums))) time.

- **Why this works / trade-off:**  
  • Reduces time from exponential or O(2ⁿ) to O(n log m), where m is max value in nums.  
  • No real downside, as this is very efficient for the constraints.

### Corner cases to consider  
- Single element: k=1, should just return that element.
- All elements equal: capability = that value.
- k > ⌊n/2⌋: (Impossible in problem, constraints guarantee always possible.)
- Houses with large and small values intermixed: must greedily avoid large ones if possible.
- k = n: not possible to pick non-adjacent, but guaranteed by constraints.
- nums contains 0.

### Solution

```python
def minCapability(nums, k):
    # Helper: Can you rob at least k non-adjacent houses with max amount ≤cap?
    def can_rob(cap):
        count = 0
        i = 0
        n = len(nums)
        while i < n:
            if nums[i] <= cap:
                count += 1
                i += 2  # skip adjacent
            else:
                i += 1
            if count >= k:
                return True
        return False

    left = min(nums)
    right = max(nums)
    ans = right

    while left <= right:
        mid = (left + right) // 2
        if can_rob(mid):
            ans = mid
            right = mid - 1  # try to improve (minimize capability)
        else:
            left = mid + 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log m), where n = length of nums, m = max(nums).  
  Binary search over possible capabilities (log m steps), and for each, a single O(n) sweep.
- **Space Complexity:** O(1) extra (if not counting input), as only pointers and counters are used; no dp array or recursion stack needed.

### Potential follow-up questions (as if you’re the interviewer)  

- What if k is not guaranteed to be valid?  
  *Hint: How to check and return some error or signal if there's no answer?*

- What if you had to return the indices of houses robbed for minimum capability?  
  *Hint: Trace the greedy path inside can_rob to reconstruct the solution.*

- What if instead of "non-adjacent", you had to skip at least two or more houses between robberies?  
  *Hint: Modify your greedy step to increment by more than 2.*

### Summary
This is a classic "binary search on the answer" problem, where we guess the minimum feasible "capability" using a monotonic property (larger capabilities make the task easier). The greedy helper is a linear scan responding to the adjacency rule, often seen in dynamic-programming-pattern problems like "House Robber." The pattern — binary search + greedy/DP feasibility check — is very common in LeetCode hard/medium problems, such as "Minimum Maximum Distance" and related optimization / allocation problems.


### Flashcard
Binary search the minimal capability; for each guess, check if you can rob at least k non-adjacent houses with values ≤ guess.

### Tags
Array(#array), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Greedy(#greedy)

### Similar Problems
- Container With Most Water(container-with-most-water) (Medium)
- House Robber(house-robber) (Medium)