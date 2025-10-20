### Leetcode 1854 (Easy): Maximum Population Year [Practice](https://leetcode.com/problems/maximum-population-year)

### Description  
Given a list of people, where each entry logs[i] = [birthᵢ, deathᵢ] represents the birth and death years of the iᵗʰ person, find the earliest year between 1950 and 2050 (inclusive) that has the maximum population alive.  
A person is considered alive during years birthᵢ through deathᵢ – 1 (they are *not* counted in the year deathᵢ).

### Examples  

**Example 1:**  
Input: `logs = [[1993,1999],[2000,2010]]`  
Output: `1993`  
*Explanation: The population in 1993 is 1 (only the first person is alive). The population in 2000 is also 1 (second person). Both years have the same population, but 1993 is earlier.*

**Example 2:**  
Input: `logs = [[1950,1961],[1960,1971],[1970,1981]]`  
Output: `1960`  
*Explanation:  
Year 1950: 1 (first person)  
Year 1960: 2 (first and second person alive)  
Year 1970: 2 (second and third person)  
Max population is 2 at years 1960 and 1970, earliest is 1960.*

**Example 3:**  
Input: `logs = [[1985,1995],[1990,2000],[1995,2005]]`  
Output: `1990`  
*Explanation:  
Year 1990:  
- First person (1985–1994) is alive  
- Second person (1990–1999) starts being alive  
So 2 people alive, which is the earliest year with maximum population.*

### Thought Process (as if you’re the interviewee)  
First, I need to count, for each year, how many people are alive. Since the years are in the range 1950–2050, a brute-force solution is possible: for each year in that range, count how many people are alive. For each person, their interval is [birthᵢ, deathᵢ), so if the current year y satisfies birthᵢ ≤ y < deathᵢ, they are alive.

However, that's O(N × 101), which is manageable for N ≤ 100.

A better method uses a "prefix sum" or "difference array" technique. For each birth year, increment the population; for each death year, decrement. Then do an accumulating sum over the years to find, for each year, the total population.  
This approach is faster and cleaner.

Trade-offs:  
- Brute force is acceptable for small input, but prefix sum/difference array is cleaner and more scalable.
- Both solutions have effectively constant space for the years; prefix sum solution takes O(101) = O(1) space for the year array.

### Corner cases to consider  
- Only one log (person); check single person edge case.
- Multiple people with the same birth or death year.
- People with birth and death in consecutive years (lives only one year).
- All people die the same year.
- Multiple years share the same max population; earliest must be selected.

### Solution

```python
def maximumPopulation(logs):
    # Array to store population changes for years 1950-2050
    year_deltas = [0] * 101  # Index 0 corresponds to 1950
    
    # For each log, add population at birth year, remove at death year
    for birth, death in logs:
        year_deltas[birth - 1950] += 1
        year_deltas[death - 1950] -= 1
    
    max_pop = 0
    curr_pop = 0
    max_year = 1950
    
    # Prefix sum to find population each year, and record earliest year if multiple have max pop
    for i in range(101):  # 1950 + i is the year
        curr_pop += year_deltas[i]
        if curr_pop > max_pop:
            max_pop = curr_pop
            max_year = 1950 + i
    return max_year
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + Y), where N is the number of logs and Y = 101 (number of years between 1950–2050). Each log processed once; each year processed once for accumulation.
- **Space Complexity:** O(1) for year_deltas (since years are in a constant range 1950–2050), and O(1) for used variables. No extra space depends on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- If the year range was much bigger (not bounded in 1950–2050), how would you solve it?
  *Hint: Consider using hashmap or TreeMap to efficiently store and query years.*

- How would you modify if you also needed to output all years with the maximum population?
  *Hint: Track all years as you build the prefix sums.*

- What if you could receive birth and death events out of order, or with millions of logs?  
  *Hint: Discuss memory trade-offs and scanline/event queue algorithms.*

### Summary
This problem uses the **difference array (prefix sum)** technique to efficiently count and query the number of people alive per year given constrained year ranges. It's a classic example of sweep-line/interval addition and counting pattern, commonly seen in calendar merge, meeting room, or overlapping intervals problems. This approach is efficient, easily scalable for small year ranges, and avoids nested loops.


### Flashcard
Apply a prefix sum technique to count alive people for each year, optimizing the calculation of the maximum population year.

### Tags
Array(#array), Counting(#counting), Prefix Sum(#prefix-sum)

### Similar Problems
- Shifting Letters II(shifting-letters-ii) (Medium)