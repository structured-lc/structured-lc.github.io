### Leetcode 2251 (Hard): Number of Flowers in Full Bloom [Practice](https://leetcode.com/problems/number-of-flowers-in-full-bloom)

### Description  
Given a list of flowers where each flower has a blooming interval `[startᵢ, endᵢ]` (inclusive), and a list of people where each person wants to know how many flowers are in *full bloom* at a specific arrival time, return an array where for each person you return the count of flowers in bloom at their arrival time.

For each query, a flower is in *full bloom* at time `t` if `startᵢ ≤ t ≤ endᵢ`.

### Examples  

**Example 1:**  
Input:  
flowers = `[[1,4],[2,3],[4,6]]`, people = `[2,3,4,5]`  
Output:  
`[2,2,3,1]`  
Explanation:  
- At time 2: flowers [1,4] and [2,3] are blooming ⟶ count = 2.  
- At time 3: [1,4] and [2,3] are blooming ⟶ count = 2.  
- At time 4: all three flowers ([1,4], [2,3], [4,6]) are blooming ⟶ count = 3.  
- At time 5: only [4,6] is blooming ⟶ count = 1.

**Example 2:**  
Input:  
flowers = `[[1,10],[3,3]]`, people = `[3,7,11]`  
Output:  
`[2,1,0]`  
Explanation:  
- At time 3: [1,10] and [3,3] are both blooming ⟶ count = 2.  
- At time 7: only [1,10] is blooming ⟶ count = 1.  
- At time 11: none are blooming ⟶ count = 0.

**Example 3:**  
Input:  
flowers = `[[5,7]]`, people = `[3,5,7,8]`  
Output:  
`[0,1,1,0]`  
Explanation:  
- At time 3: no flowers are blooming.
- At time 5: [5,7] is blooming ⟶ count = 1.
- At time 7: [5,7] is still blooming ⟶ count = 1.
- At time 8: none are blooming.

### Thought Process (as if you’re the interviewee)  
- **Brute-force** approach:  
  For each person, check every flower and count if the arrival time falls within its bloom interval.  
  - Time: O(P×N), where P=number of people, N=number of flowers.  
  - Not efficient if arrays are large.

- **Optimized approach:**  
  Can we preprocess the intervals for faster queries?  
  - Idea: For each person, we want to know:  
    **How many flowers started blooming by time t and how many stopped before t?**  
  - If we have sorted arrays of all start times and end times, for a given query time t:
    - Flowers that started: count of startᵢ ≤ t.
    - Flowers that ended: count of endᵢ < t (since bloom is inclusive, so `< t+1`).
  - Full bloom = started − ended.
  - Use binary search (bisect) to count quickly.

- **Trade-offs:**  
  - Sorting costs O(N log N).
  - Each query can be processed in O(log N) time, much better when there are multiple queries.

### Corner cases to consider  
- No flowers or no people.
- Overlapping flower intervals.
- Multiple flowers with the same start or end time.
- Query times before all starts and after all ends.
- Intervals of length 0 (startᵢ = endᵢ).
- Multiple queries with the same time.
- Negative or large times.

### Solution

```python
def fullBloomFlowers(flowers, people):
    # Step 1: Extract and sort all starts and ends
    starts = sorted(flower[0] for flower in flowers)
    ends = sorted(flower[1] for flower in flowers)
    
    result = []

    def count_leq(arr, x):
        # Binary search: count of elements ≤ x
        left, right = 0, len(arr)
        while left < right:
            mid = (left + right) // 2
            if arr[mid] <= x:
                left = mid + 1
            else:
                right = mid
        return left

    for t in people:
        # Count flowers that have started at or before time t
        started = count_leq(starts, t)
        # Count flowers that ended before time t (end is inclusive, so check ≤ t-1)
        ended = count_leq(ends, t - 1)
        # Full bloom flowers are the ones started but not yet ended
        result.append(started - ended)

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N log N + P log N), where N is the number of flowers, and P is the number of people.  
  - Sorting starts and ends: O(N log N).
  - For each of P queries: O(log N) binary search.

- **Space Complexity:**  
  O(N), for storing the sorted start and end arrays. Result array is O(P).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle online queries, i.e., people’s queries are given one at a time, potentially after preprocessing?  
  *Hint: Consider precomputing, prefix sums, or segment trees for O(1) queries if time range is constrained.*

- What if the flowers and query times can be up to 10⁹ and too large for array indices?  
  *Hint: Your approach doesn’t require explicit time mapping—binary search on sorted arrays suffices.*

- Can you design the solution if you have repeated person arrival times, or need the results in the given order?  
  *Hint: Track query indices, sort, and restore answer order at the end.*

### Summary
This is a **sorting + binary search** problem, a direct application of the interval covering/counting pattern.  
The key trick is to pre-sort start and end times, so queries asking "how many intervals cover this point?" are answered in O(log N) each.  
This pattern applies broadly: sweep line problems, calculating concurrent intervals, or answering range-count queries efficiently.


### Flashcard
Preprocess sorted start and end times, then for each person, use binary search to count flowers in bloom as (started by t) minus (ended before t).

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Sorting(#sorting), Prefix Sum(#prefix-sum), Ordered Set(#ordered-set)

### Similar Problems
- Meeting Rooms II(meeting-rooms-ii) (Medium)
- Minimum Interval to Include Each Query(minimum-interval-to-include-each-query) (Hard)