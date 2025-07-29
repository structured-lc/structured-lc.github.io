### Leetcode 1744 (Medium): Can You Eat Your Favorite Candy on Your Favorite Day? [Practice](https://leetcode.com/problems/can-you-eat-your-favorite-candy-on-your-favorite-day)

### Description  
You are given an array **candiesCount** where candiesCount[i] is the number of candies of the iᵗʰ type (types are 0-indexed).  
You also get a list of **queries**: each query consists of [favoriteType, favoriteDay, dailyCap].  
- You start eating candies on day 0.
- You must eat at least one candy every day.
- You must finish all candies of type i before starting any from type i+1.
- **Goal:** For each query, determine if it is possible to eat at least one candy of your favoriteType on your favoriteDay, without ever eating more than dailyCap candies in a single day and following the above rules.

### Examples  

**Example 1:**  
Input:  
candiesCount = `[7,4,5,3,8]`,  
queries = `[[0,2,2],[4,2,4],[2,13,1000000000]]`  
Output:  
`[true, false, true]`  
*Explanation*:  
- Query 1: Can you eat type 0 on day 2 with cap 2? The least you could have eaten is 3, the most is 6; there are 7 of type 0, so yes.
- Query 2: Can you eat type 4 on day 2 with cap 4? On day 2, you can eat at most 12 candies. Need to finish types 0..3 first (sum=19), but by day 2, not enough days.
- Query 3: Can you eat type 2 at day 13 with huge cap? Yes, you can.

**Example 2:**  
Input:  
candiesCount = `[5,2,6,4,1]`,  
queries = `[[3,1,2],[4,10,3]]`  
Output:  
`[false, false]`  
*Explanation*:  
- For both queries, given the rules, you can't reach your favoriteType on favoriteDay.

**Example 3:**  
Input:  
candiesCount = ``,  
queries = `[[0,0,1],[0,9,1]]`  
Output:  
`[true, true]`  
*Explanation*:  
- Single candy type. On both day 0 and day 9, it's possible.

### Thought Process (as if you’re the interviewee)  
First, let's clarify what each query asks: Is there a way, following the rules, to eat at least one candy of favoriteType on favoriteDay, eating at least 1 and at most dailyCap candies per day?

**Brute force**:  
For each query, simulate daily candy eating, but that's too slow for large input.

**Optimized**:  
Notice that eating is sequential by type, so:
- Compute prefix sums of candiesCount to get how many candies you must eat to reach favoriteType.
- For each query:
  - The earliest candy you can eat on day d is d+1 (since you eat at least 1/day).
  - The most candies you can eat by day d is (d+1)×dailyCap.
  - You can start eating favoriteType after finishing all previous types: need to have eaten at least sum(prefix[0..favoriteType-1]).
  - To eat at least one favoriteType candy on day d, you must not have finished all favoriteType candies before that day, and you must have eaten enough to reach favoriteType.
- In other words, does your possible eaten range on day d overlap with the index range of favoriteType?

So, **for each query**:
- totalBefore = total candies before favoriteType
- minEaten = favoriteDay + 1
- maxEaten = (favoriteDay + 1) × dailyCap
- The range of candies indices for favoriteType: [totalBefore + 1, totalBefore + candiesCount[favoriteType]]
- There is an answer only if maxEaten > totalBefore and minEaten ≤ totalBefore + candiesCount[favoriteType].

This is O(n) for building prefix sums, O(q) for queries.

### Corner cases to consider  
- Only one type of candy.
- Queries for day 0.
- dailyCap = 1.
- Query for a day after all candies would be finished.
- Large dailyCap (allows skipping quickly).
- CandiesCount contains very large or small numbers.


### Solution

```python
def canEat(candiesCount, queries):
    # Compute prefix sums so we know how many candies are before each type
    n = len(candiesCount)
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i+1] = prefix[i] + candiesCount[i]

    res = []

    for favoriteType, favoriteDay, dailyCap in queries:
        # candies before our favoriteType
        totalBefore = prefix[favoriteType]
        # at earliest, we've eaten this many candies by favoriteDay
        minEaten = favoriteDay + 1
        # at most, this many
        maxEaten = (favoriteDay + 1) * dailyCap

        # The iᵗʰ type candies range from index totalBefore+1 ... totalBefore+candiesCount[i]
        # We can eat favoriteType candy on favoriteDay
        # if maxEaten > totalBefore (still haven't finished previous types)
        # and minEaten ≤ totalBefore + candiesCount[favoriteType] (we haven't run out)
        can = maxEaten > totalBefore and minEaten <= (totalBefore + candiesCount[favoriteType])
        res.append(can)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + q), where n = number of candy types, and q = number of queries. O(n) to build prefix sums, O(q) to check each query.
- **Space Complexity:** O(n) for prefix sum array, plus O(1) extra for variables and O(q) for results.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if you could eat candies out of type order?
  *Hint: Think about whether prefix sums would still work.*

- If dailyCap varies each day instead of a single value per query, how would you handle it?
  *Hint: Consider prefix sums on the dailyCap sequence per query.*

- Could you answer similar queries in an online (real-time) fashion with updates to candiesCount?
  *Hint: Think about efficient data structures for range queries + updates, e.g., Fenwick Tree or Segment Tree.*

### Summary
This problem is a great application of **prefix sums** for fast range computation. The central pattern is to precompute cumulative information for quick per-query lookups. This pattern is useful in a wide class of "cumulative constraint" problems, such as range-sum queries, scheduling, and simulation scenarios where order and limits matter.