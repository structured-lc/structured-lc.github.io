### Leetcode 740 (Medium): Delete and Earn [Practice](https://leetcode.com/problems/delete-and-earn)

### Description  
You are given an array of integers `nums`. Each time you pick any element `nums[i]`, you *earn* `nums[i]` points, but then **must remove** *all* instances of both `nums[i] - 1` and `nums[i] + 1` (if they exist) from the array. Your goal is to earn as many points as possible by repeating this operation, choosing elements in any order, until the array is empty. You must plan your picks to maximize your points, carefully considering how picking one value may eliminate others you could have earned from later.

### Examples  

**Example 1:**  
Input: `nums = [3,4,2]`  
Output: `6`  
*Explanation: Pick 4 (earn 4), 3 is deleted. nums = [2]. Then pick 2 (earn 2). Total = 6.*

**Example 2:**  
Input: `nums = [2,2,3,3,3,4]`  
Output: `9`  
*Explanation: Pick any 3 (earn 3), all 2's and 4's are deleted. nums = [3,3]. Pick a 3 again (earn 3). nums = [3]. Pick last 3 (earn 3). Total = 9.*

**Example 3:**  
Input: `nums = [1,1,1,2,4,5,5,5,6]`  
Output: `18`  
*Explanation:  
Pick 5 (earn 15), 4 and 6 are also deleted (all instances!) → nums = [1,1,1,2].  
Pick 1 (earn 3), 2 is deleted.  
Total = 18.*

### Thought Process (as if you’re the interviewee)  
Let's start with the basic idea:  
- For each pick, we lose access to all values +1 and -1 to what we picked, not just a single instance.
- If you pick a value x, you might want to take *all* x's at once, since if you pick one you have to delete all its neighbors anyway.  
- This feels like the **House Robber** DP pattern: you can't "rob" adjacent houses (here, adjacent values).  

**Brute-force**: Try every sequence of pick choices (pick or skip for each number), but that's too slow.  

**Optimization**:  
- Tally up total points for *each distinct number* (e.g. for number 3, total points is 3 × frequency of 3).
- If you pick number x, you must skip x-1 and x+1.
- Sort the unique numbers and process them in increasing order. For each value, decide if you take all points for it (and add them to the best you could have done without its immediate predecessor), or skip it and take the best up to the previous value.
- Formalize with:  
  dp[i] = max(dp[i-1], dp[i-2] + points_for_value_i)
- This way, it's just like House Robber but over value space not index order.

### Corner cases to consider  
- Empty array (`nums = []`) → return 0.
- All elements are the same (e.g. `[4,4,4]`).
- Array has only one element.
- Array has only two consecutive values (e.g. `[5,6,6]`).
- Sparse array (e.g. `[1,100,101,102]`).

### Solution

```python
def deleteAndEarn(nums):
    if not nums:
        return 0

    # Build points: points[x] = x × frequency of x in nums
    max_num = max(nums)
    points = [0] * (max_num + 1)
    for num in nums:
        points[num] += num

    # Now, classic house robber DP
    take, skip = 0, 0
    for value in points:
        take, skip = skip + value, max(skip, take)
    return max(take, skip)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + k), where n is the length of nums, and k is the range of numbers (max(nums)).
  - Building the points array is O(n).
  - DP traversal over all values up to max(nums) is O(k).
- **Space Complexity:** O(k), for the points array of size max(nums)+1.


### Potential follow-up questions (as if you’re the interviewer)  

- What if `nums` contains extremely large numbers (e.g. up to 10⁹) but is sparse?
  *Hint: Can you use a dictionary instead of a dense array to store points?*

- How would you modify this if removing a value only deleted a *single instance* of each neighbor?
  *Hint: Would the DP relation need to be changed?*

- Can you reconstruct the sequence of picks that leads to the max score?
  *Hint: Track choices during DP and backtrace.*


### Summary
This problem is a direct application of the "House Robber" dynamic programming pattern, where the adjacency constraint isn't physical neighbors in an array, but neighbors by value. We transform the problem into one where we pick or skip each value (after tallying their total points), ensuring we never pick adjacent values. This pattern is widely useful and appears in many DP problems involving adjacency and exclusion constraints.