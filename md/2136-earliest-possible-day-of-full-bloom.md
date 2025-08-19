### Leetcode 2136 (Hard): Earliest Possible Day of Full Bloom [Practice](https://leetcode.com/problems/earliest-possible-day-of-full-bloom)

### Description  
Given n flower seeds, each with its own **plantTime** and **growTime**:

- Each day, you can only plant **one seed**, but you can switch which seed you're planting on each day and don't have to plant for consecutive days.
- For a seed i, you must spend **plantTime[i]** days planting (can be non-consecutive), after which you immediately start its growth.
- Once the growth of a seed starts, it takes **growTime[i]** days to bloom.
- All seeds can be planted in any order.

**Goal:**  
Find the **earliest possible day** on which **all** seeds are blooming.

### Examples  

**Example 1:**  
Input: `plantTime = [1,4,3]`, `growTime = [2,3,1]`  
Output: `9`  
*Explanation:  
- Plant seed 1 (plantTime=4, growTime=3) first (day 0-3); it will bloom at day 4+3=7.  
- Next, plant seed 0 (plantTime=1, growTime=2) on day 4; it will bloom at day 5+2=7.  
- Next, plant seed 2 (plantTime=3, growTime=1) on days 5-7; it will bloom at day 8.  
- The last bloom is at day 8, so earliest full bloom is day 8 (counting from day 0, answer is 9 by 1-based count).*

**Example 2:**  
Input: `plantTime = [1,2,3,2]`, `growTime = [2,1,2,1]`  
Output: `9`  
*Explanation:  
- Plant longest grow time seeds first.  
- Plant seed with growTime=2 (plantTime=3), then with growTime=2 (plantTime=1), then growTime=1.  
- Tracking current day and updating, max bloom ends at 8, so answer is 9.*

**Example 3:**  
Input: `plantTime = [1]`, `growTime = [1]`  
Output: `2`  
*Explanation:  
Only one seed; plant for 1 day (day 0), grows for 1 day (day 1), blooms on day 1 (1-based: 2).*


### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all permutations of planting orders. For each, simulate planting/growing, find the latest bloom day; return minimum over all permutations. But there are n! permutations; infeasible for large n.
- **Key observation:** We can plant fastest-growing seeds last, since their blooms can "catch up" to earlier ones.  
- **Greedy approach:** Always plant seeds with the **longest growTime** first, since their finish time will impact the earliest full bloom the most.
    - Sort all seeds by growTime descending.
    - Keep a currentDay counter; for each seed, increment currentDay by its plantTime, and record when it would bloom (currentDay + growTime).
    - Track the maximum bloom day over all seeds.
- **Why is this optimal?** Because seeds with higher growTime need to “start” their growth as soon as possible so that they don’t delay the final full bloom day.

### Corner cases to consider  
- All seeds have same growTime or plantTime.
- Seeds have plantTime or growTime of zero.
- plantTime or growTime arrays are empty (n = 0).
- Only one seed.
- Seeds where plantTime ≫ growTime or vice versa.

### Solution

```python
def earliestFullBloom(plantTime, growTime):
    # Pair each seed's plant and grow times together
    seeds = list(zip(plantTime, growTime))
    
    # Sort seeds by growTime descending, so the largest growth starts first
    seeds.sort(key=lambda x: -x[1])
    
    current_day = 0  # Track cumulative planting days
    earliest_full_bloom = 0  # Result: last blooming seed time
    
    # Plant each seed in sorted order
    for p, g in seeds:
        current_day += p  # Finish planting this seed
        bloom_day = current_day + g  # This seed will bloom after growTime
        earliest_full_bloom = max(earliest_full_bloom, bloom_day)  # Track latest among all
    
    return earliest_full_bloom
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n),  
  because we sort all seeds by growTime (sort step dominates).
- **Space Complexity:** O(n),  
  to store pairs of plantTime/growTime and the sorted list. No extra space apart from input transformation.

### Potential follow-up questions (as if you’re the interviewer)  

- How does the solution change if you can plant multiple seeds per day?  
  *Hint: Think about the role of parallel processing, and which seeds to plant first if you have limited “workers.”*

- What if some days you can’t plant (blocked days/holidays)?  
  *Hint: Maintain a queue for plantable days and account for interruptions in the schedule.*

- Can you reconstruct the optimal planting order, not just the minimum day?  
  *Hint: The greedy order (sorted by decreasing growTime) is the optimal sequence.*

### Summary
This problem is a classic **greedy scheduling** question, similar to job sequencing where longer jobs (growth durations) should start as early as possible. The optimal pattern is to sort all "tasks" (seeds) by impact on the final deadline—here, **growTime**—and process them in descending order.  
Similar greedy strategies can be widely applied to problems like maximizing profit with deadlines, *minimum completion time*, or *project scheduling*.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Minimum Number of Days to Make m Bouquets(minimum-number-of-days-to-make-m-bouquets) (Medium)