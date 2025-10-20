### Leetcode 1760 (Medium): Minimum Limit of Balls in a Bag [Practice](https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag)

### Description  
You have an array of integers, where each value represents a *bag* with that many *balls*. You can split any bag into two smaller bags by dividing its balls, and you may do this up to maxOperations times. After these operations, the *penalty* is the largest number of balls in any bag.  
Your goal: find the smallest possible penalty you can guarantee after at most maxOperations splits.

### Examples  

**Example 1:**  
Input: `nums = , maxOperations = 2`  
Output: `3`  
*Explanation: Split 9 into [6,3], then 6 into [3,3], resulting in [3,3,3]. The largest bag is 3.*

**Example 2:**  
Input: `nums = [2,4,8,2], maxOperations = 4`  
Output: `2`  
*Explanation:  
Split 8 into [4,4] (`[2,4,4,4,2]`), split each 4 into [2,2] (three operations, total four), resulting in `[2,2,2,2,2,2]`. Largest bag is 2.*

**Example 3:**  
Input: `nums = [7,17], maxOperations = 2`  
Output: `7`  
*Explanation:  
Split 17 into [9,8] (`[7,9,8]`), then split 9 into [5,4] (`[7,5,4,8]`). The largest bag is 8.  
But if instead:
Split 17 into [7,10] (`[7,7,10]`), then split 10 into [5,5] (`[7,7,5,5]`), largest is 7.  
So with 2 splits, minimum penalty is 7.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all possible ways to do at most maxOperations splits and pick the minimum penalty—clearly exponential and way too slow for large input.
- **Key constraint:** We always want to minimize the size of the largest bag. That prompts the main question: what, given a penalty p, is the minimum number of splits needed to ensure all bags are ≤ p?
- **Check a penalty via greedy:** For each bag, to make it ≤ p, we need splits: (bag_size-1)//p (i.e., for 9 balls and p=3: (9-1)//3 = 2 splits)
- **Binary search over the answer:**  
  - The penalty is always between 1 (best-case, each ball is in its own bag) and max(nums) (no splits).
  - For each candidate penalty (using binary search), check if achievable with ≤ maxOperations.
  - If feasible, try smaller penalty; if not, try bigger.
- **Trade-off:** This is much faster—O(n log(max(nums))) time.

### Corner cases to consider  
- All bags are already ≤ penalty; no splits needed.
- maxOperations is 0.
- All bags are size 1.
- Only one bag.
- Can’t achieve lower penalty even if split all possible times.

### Solution

```python
def minimumSize(nums, maxOperations):
    # Helper: returns True if we can achieve penalty <= x with maxOperations
    def can_achieve(x):
        ops = 0
        for balls in nums:
            # How many splits to make this bag size <= x?
            ops += (balls - 1) // x
        return ops <= maxOperations

    # The minimum penalty ranges from 1 to max(nums).
    left, right = 1, max(nums)
    ans = right
    while left < right:
        mid = (left + right) // 2
        if can_achieve(mid):
            ans = mid
            right = mid
        else:
            left = mid + 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log(max(nums))).  
  For each candidate penalty (log(max(nums)) possibilities), we scan all n nums to check if the penalty is reachable.
  
- **Space Complexity:** O(1).  
  Only constant extra space; no additional structures besides iteration variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if splits can divide the bag into any number of smaller bags instead of just two?  
  *Hint: Think about generalized division and counting the number of resulting bags.*

- How would you modify the algorithm if balls sizes are not uniform (each ball is unique or weighs differently)?  
  *Hint: You may need to change the way splits are calculated per bag.*

- What if you had to return the actual assignment of balls to bags, not just the penalty?  
  *Hint: Track all split operations and bag sizes instead of just counting splits.*

### Summary
This problem is a classic example of **binary search on the answer** (also called search on the solution space), a common pattern for optimization problems where feasibility can be checked efficiently. It occurs in many array partitioning, scheduling, and resource allocation scenarios. The key insight is to convert the problem to a decision problem (can you achieve this penalty?) and binary search the minimal value.


### Flashcard
Binary search the minimum possible penalty; for each guess, greedily split bags until all are ≤ penalty, count splits.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Maximum Candies Allocated to K Children(maximum-candies-allocated-to-k-children) (Medium)
- Minimized Maximum of Products Distributed to Any Store(minimized-maximum-of-products-distributed-to-any-store) (Medium)