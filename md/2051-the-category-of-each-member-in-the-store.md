### Leetcode 2051 (Medium): The Category of Each Member in the Store [Practice](https://leetcode.com/problems/the-category-of-each-member-in-the-store)

### Description  
Given a list of store members, their visit records, and their purchases, categorize each member based on the *conversion rate* of purchases per visit.  
- Each member may have 0 or more visits; visits may or may not have purchases.  
- The conversion rate is:  
  conversion rate = number of purchases / number of visits  
- Members are grouped as:  
  - **Bronze**: No visits  
  - **Silver**: conversion rate < 0.5  
  - **Gold**: 0.5 ≤ conversion rate < 0.8  
  - **Diamond**: conversion rate ≥ 0.8  

Return each member’s id, name, and category.

### Examples  

**Example 1:**  
Input:  
Members = `[{"id":1, "name":"Alice"}, {"id":2, "name":"Bob"}]`  
Visits = `[{"visit_id":101, "member_id":1}, {"visit_id":102, "member_id":1}, {"visit_id":103, "member_id":2}]`  
Purchases = `[{"purchase_id":201, "visit_id":101}, {"purchase_id":202, "visit_id":102}]`  
Output:  
`[[1, "Alice", "Diamond"], [2, "Bob", "Silver"]]`  
Explanation:  
Alice has 2 visits, 2 purchases: 2/2 = 1.0 → Diamond  
Bob has 1 visit, 0 purchases: 0/1 = 0 → Silver

**Example 2:**  
Input:  
Members = `[{"id":1, "name":"Anna"}]`  
Visits = `[]`  
Purchases = `[]`  
Output:  
`[[1, "Anna", "Bronze"]]`  
Explanation:  
Anna has no visits, so category is Bronze.

**Example 3:**  
Input:  
Members = `[{"id":1, "name":"Max"}]`  
Visits = `[{"visit_id":1, "member_id":1}, {"visit_id":2, "member_id":1}]`  
Purchases = `[{"purchase_id":1, "visit_id":1}]`  
Output:  
`[[1, "Max", "Silver"]]`  
Explanation:  
Max has 2 visits, 1 purchase: 1/2 = 0.5, falls in Gold if ≥0.5 and <0.8. But by the original SQL, only ≥0.8 is Diamond, 0.5 ≤ x < 0.8 is Gold, <0.5 is Silver. If solution requires strict '< 0.5' for Silver, 0.5 falls in Gold.

### Thought Process (as if you’re the interviewee)  
- **Naive approach:** For each member, scan all visits and purchases to compute their counts. For each member:
  - Count visits with matching member_id.
  - Count purchases for those visits (by mapping purchase.visit_id).
  - This is O(n \* m) if not indexed (slow for large inputs).
- **Optimal approach:**
  - Build a mapping from member_id to list of visit_ids.
  - For each member, count visits.
  - For each member’s visit_ids, count how many have purchases (use a set for fast lookup).
  - Assign category based on the conversion rate.
  - This reduces the lookups with hash maps, to O(V + P + M), where V = visits, P = purchases, M = members.

### Corner cases to consider  
- No members at all.
- Members with no visits (should be Bronze).
- Visits with no purchases.
- Purchases without visits (should not happen if clean data, but validate).
- Multiple purchases for a single visit (does each count or only distinct? Problem usually assumes 1 per visit).
- Conversion rate exactly 0.5, 0.8 (careful with inclusive/exclusive ranges).
- Empty arrays.

### Solution

```python
def categorize_members(members, visits, purchases):
    # Step 1: Map member_id to number of visits
    visit_count = {}
    visit_member = {}
    for visit in visits:
        m_id = visit['member_id']
        v_id = visit['visit_id']
        visit_count[m_id] = visit_count.get(m_id, 0) + 1
        visit_member[v_id] = m_id  # reverse map
    
    # Step 2: Map member_id to number of purchases (by visit_id)
    purchase_count = {}
    for purchase in purchases:
        v_id = purchase['visit_id']
        if v_id in visit_member:
            m_id = visit_member[v_id]
            purchase_count[m_id] = purchase_count.get(m_id, 0) + 1
    
    # Step 3: Categorize each member
    res = []
    for member in members:
        m_id = member['id']
        name = member['name']
        visits = visit_count.get(m_id, 0)
        purchases = purchase_count.get(m_id, 0)
        if visits == 0:
            category = "Bronze"
        else:
            ratio = purchases / visits
            if ratio < 0.5:
                category = "Silver"
            elif ratio < 0.8:
                category = "Gold"
            else:
                category = "Diamond"
        res.append([m_id, name, category])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(M + V + P), where M = number of members, V = number of visits, P = number of purchases.  
  You scan each list once and perform constant-time hash lookups.
- **Space Complexity:** O(V + M), to store visit-member mapping, visit counts, and purchase counts.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle *multiple purchases per visit*?  
  *Hint: Should each purchase count, or only one per visit?*

- What if *some purchases reference unknown visit_ids*?  
  *Hint: Should you ignore those, or report data inconsistencies?*

- If the *tiers or thresholds change* frequently, can you make the solution easily extendable?  
  *Hint: Consider using a config or mapping for categories.*

### Summary
This is a **"group-by/count and then bucket by threshold"** pattern using hash tables to aggregate events, a common scenario in analytics and reporting.  
It’s useful for problems like segmenting users by engagement, identifying top customers by transaction ratios, or labeling data with computed categories for business logic.

### Tags
Database(#database)

### Similar Problems
