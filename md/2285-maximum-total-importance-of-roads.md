### Leetcode 2285 (Medium): Maximum Total Importance of Roads [Practice](https://leetcode.com/problems/maximum-total-importance-of-roads)

### Description  
Given `n` cities labeled from 0 to n-1 and a list of bidirectional roads where each road connects two different cities `[a, b]`, assign each city a unique integer value from 1 to n ("importance value"). The **importance of a road** is defined as the sum of the values assigned to its two cities. The goal is to assign these values to maximize the **total road importance**, defined as the sum of importances for all roads.

### Examples  

**Example 1:**  
Input: `n = 5, roads = [[0,1],[0,2],[0,3],[1,2]]`  
Output: `23`  
*Explanation:  
Assign importance: city 0→5, city 1→4, city 2→3, city 3→2, city 4→1 (one example).  
For each road:  
[0,1]: 5+4=9  
[0,2]: 5+3=8  
[0,3]: 5+2=7  
[1,2]: 4+3=7  
Total = 9+8+7+7 = 31  
(Optimal values following the highest degree get highest numbers. Depending on value assignments, if sorted properly, the sum will be maximized with this method.)*

**Example 2:**  
Input: `n = 2, roads = [[0,1]]`  
Output: `3`  
*Explanation:  
Assign city 0→2, city 1→1. Road [0,1]: 2+1=3.*

**Example 3:**  
Input: `n = 3, roads = [[1,2],[0,2]]`  
Output: `8`  
*Explanation:  
Degree counts: 2→2, 1→1, 0→1.  
Assign 2→3, 1→2, 0→1.  
Road [1,2]: 2+3=5  
Road [0,2]: 1+3=4  
Total = 5+4=9.*

### Thought Process (as if you’re the interviewee)  

- The brute-force approach is to try every permutation of 1,\dots,n as city values and compute the total importance. This is infeasible for large n due to n! permutations.
- Observe that the importance of a road is the sum of values from two cities. If a city appears in many roads, its value is counted multiple times.
- Therefore, to maximize total importance, assign the highest numbers to cities with the largest number of roads (highest degree).
- Steps:
  1. Count degree (number of roads) for each city.
  2. Sort cities by degree in descending order.
  3. Assign largest importance value n to the city with highest degree, n-1 to next highest, etc.
  4. Sum importance of all roads using assigned city values.
- This greedy approach is justified because every time a city appears in a road, its value contributes to the total sum, so maximizing values on high-degree cities gives globally optimal result.

### Corner cases to consider  
- n = 2 (only one road)
- No roads (roads is empty, but by constraint there is at least one road)
- All cities connected to exactly one other (degree is the same: tie-break arbitrarily)
- Very dense graph (close to complete)
- Cities with zero degree (if allowed; but per constraints, all roads are between valid cities, so not possible for this problem)
- Multiple cities with same degree (assign values arbitrarily among them)

### Solution

```python
def maximumImportance(n, roads):
    # Step 1: Count degrees for each city
    degree = [0] * n
    for a, b in roads:
        degree[a] += 1
        degree[b] += 1

    # Step 2: Pair each city with its degree and sort descending
    cities = list(range(n))
    cities.sort(key=lambda x: degree[x], reverse=True)

    # Step 3: Assign importance n, n-1, ..., 1 to cities with highest degree first
    importance = [0] * n
    curr_val = n
    for city in cities:
        importance[city] = curr_val
        curr_val -= 1

    # Step 4: Sum importance for all roads
    total = 0
    for a, b in roads:
        total += importance[a] + importance[b]

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m + n log n), where n = number of cities, m = number of roads.  
    - O(m) to calculate degrees, O(n log n) to sort cities by degree, O(m) to sum up the result.
- **Space Complexity:** O(n) for degree and importance arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- If city values do not have to be unique, how would you maximize the total?  
  *Hint: Assign the maximum value to all cities.*

- If more than one road can exist between a pair of cities, does the approach change?  
  *Hint: Degree calculation counts each duplicate connection separately, method still applies.*

- How would you solve it if importance value ranges are not 1 to n, but arbitrary positive numbers?  
  *Hint: Still assign higher numbers to higher-degree cities, but sorting both importance values and degrees arrays in order.*

### Summary
This is a classic **greedy + sorting** pattern: assign scarce resources (highest values) to the "hubs" (cities with most impact). This approach appears in several resource allocation and maximization graph problems, where a node's value is counted multiple times based on its connectivity. The generalizable pattern: "When the marginal utility of assignment depends on usage frequency, sort and match high-demand with high-supply."