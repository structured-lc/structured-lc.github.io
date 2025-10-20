### Leetcode 2226 (Medium): Maximum Candies Allocated to K Children [Practice](https://leetcode.com/problems/maximum-candies-allocated-to-k-children)

### Description  
Given an array **candies**, where each element represents the number of candies in a pile, and a number **k** (the number of children), your goal is to distribute the candies so that:
- Each child receives *exactly the same number* of candies.
- Each child can only take from one pile (which may be a pile split from an original pile, but candies from different piles cannot be merged).
- Some piles (or parts of piles) may remain unused.

Return the **maximum number of candies each child can get** under these constraints.

### Examples  

**Example 1:**  
Input: `candies = [5,8,6]`, `k = 3`  
Output: `5`  
*Explanation:  
- Split pile 8 into 5 and 3; split pile 6 into 5 and 1.  
- Now have five piles: [5,5,5,3,1].
- Allocate three 5-sized piles to three children.*

**Example 2:**  
Input: `candies = [2,5]`, `k = 11`  
Output: `0`  
*Explanation:  
- Only 7 candies in total; not enough for each of the 11 children to get at least 1.  
- So output is 0.*

**Example 3:**  
Input: `candies = [9,7,5]`, `k = 4`  
Output: `5`  
*Explanation:  
- From 9: two 5-piles (5,4)
- From 7: one 5-pile (5,2)
- From 5: one 5-pile (5)
- Four children each get 5 candies.*

### Thought Process (as if you’re the interviewee)  
Brute force would consider all possible numbers of candies per child and check if k children could be served that way, but that is far too slow.

Instead, I notice that for any candidate amount m, I can check in O(n) time: sum up `pile // m` for each pile—this gives the number of kids who can receive m candies. So, the problem reduces to searching for the maximum m such that at least k children can be given m candies from the piles.

This is a classic "search for the maximum feasible answer" problem—i.e., **binary search**.  
- Search space: 1 to max(candies).
- For each mid value, check if at least k kids can be served by summing up `pile // mid` for all piles.
- If feasible, try a higher value; if not, lower.

This is both efficient and easy to implement and avoids TLE for large inputs.

### Corner cases to consider  
- k > sum(candies): Not enough candies, must return 0.
- n = 1 (single pile): Can distribute only to as many kids as `pile // m` permits.
- All piles have same number.
- Some piles too small to be split into minimum size.
- Large k (up to 10¹²).
- Piles with 1 candy only.

### Solution

```python
def maximumCandies(candies, k):
    # Helper: can we serve at least k kids with x candies each?
    def canGive(x):
        count = 0
        for pile in candies:
            count += pile // x
        return count >= k
    
    left, right = 1, max(candies)
    answer = 0
    
    while left <= right:
        mid = left + (right - left) // 2
        if canGive(mid):
            answer = mid    # feasible, try for bigger m
            left = mid + 1
        else:
            right = mid - 1
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log M), where n = len(candies) and M = max number of candies in any pile. For each binary search iteration (log M steps), we do O(n) work to count how many kids can be served.
- **Space Complexity:** O(1) extra space, ignoring input. We only use a few variables (no new arrays or recursion).

### Potential follow-up questions (as if you’re the interviewer)  

- If candies could not be split (i.e., each child must get a whole pile), how would you solve it?  
  *Hint: Just check if k ≤ number of piles; if so, give the smallest k piles; else, impossible.*

- If a child could take candies from multiple piles (i.e., you can merge piles), does the strategy change?  
  *Hint: Yes, just sum total candies, return total // k.*

- How to efficiently handle updates/queries if candies or k can change frequently?  
  *Hint: Consider segment trees or binary index trees for advanced scenarios (if merges/splits allowed).*

### Summary
This problem uses the **binary search on the answer pattern**, common in allocation/partitioning problems when feasibility for a fixed value can be checked efficiently. The counting logic is O(n), and binary search efficiently narrows down the maximum number of candies per child. This approach is widely applicable—e.g., distributing other resources (wood, ribbons), maximizing minimums, etc.


### Flashcard
Binary search for the maximum m where sum(pile // m for pile in piles) ≥ k.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Koko Eating Bananas(koko-eating-bananas) (Medium)
- Minimum Limit of Balls in a Bag(minimum-limit-of-balls-in-a-bag) (Medium)
- Minimum Speed to Arrive on Time(minimum-speed-to-arrive-on-time) (Medium)
- Maximum Number of Removable Characters(maximum-number-of-removable-characters) (Medium)
- Minimized Maximum of Products Distributed to Any Store(minimized-maximum-of-products-distributed-to-any-store) (Medium)
- Minimum Time to Complete Trips(minimum-time-to-complete-trips) (Medium)
- Minimize Maximum of Array(minimize-maximum-of-array) (Medium)
- Maximize Happiness of Selected Children(maximize-happiness-of-selected-children) (Medium)