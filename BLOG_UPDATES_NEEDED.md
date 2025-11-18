# Blog Posts - Update Needed

## What Needs Changing

Since we pivoted from "Comprehensive Vehicle Reports" to "PPSR Checks Only", the blog posts need updating to reflect this.

### Files That Need Updates:

1. **`src/app/blog/what-is-ppsr-check-australia/page.tsx`**
   - ✅ Already PPSR-focused (probably fine as-is)
   - Check for any mentions of "comprehensive report" or "market valuation"

2. **`src/app/blog/what-to-check-when-buying-used-car/page.tsx`**
   - Likely mentions "full vehicle history" or "comprehensive checks"
   - Update to focus on PPSR as the essential check
   - Remove mentions of market valuation, professional analysis, etc.

3. **`src/app/blog/car-buying-scams-australia-2024/page.tsx`**
   - Probably talks about comprehensive protection
   - Update to emphasize PPSR check prevents scams
   - Remove non-PPSR features

4. **`src/app/blog/red-flags-buying-used-cars/page.tsx`**
   - Likely discusses various checks
   - Focus on red flags that PPSR reveals (finance, stolen, write-offs)
   - Remove mentions of features we don't offer

5. **`src/app/blog/page.tsx`**
   - Main blog index page
   - Update any CTAs or descriptions mentioning comprehensive reports

---

## Search & Replace Strategy

Search for these terms across all blog files:

### Remove/Replace:
- ❌ "comprehensive vehicle report"
- ❌ "market valuation"
- ❌ "professional grade analysis"
- ❌ "expert team review"
- ❌ "full vehicle history"
- ❌ "pricing databases"
- ❌ "market heat analysis"

### Replace With:
- ✅ "official PPSR check"
- ✅ "PPSR certificate"
- ✅ "finance, stolen, and write-off check"
- ✅ "government PPSR database"

---

## Quick Check Command

Run this to find problematic mentions:

```bash
grep -r "comprehensive" src/app/blog/
grep -r "market valuation" src/app/blog/
grep -r "professional" src/app/blog/
grep -r "expert team" src/app/blog/
```

---

## Priority

**Low priority** - Blog posts drive organic traffic but don't directly affect conversion.

Focus on:
1. ✅ Analytics setup (done)
2. ✅ Conversion optimization (done)
3. ⏳ Monitor conversion data for 24-48 hours
4. Later: Update blogs when you have time

The blogs are still valuable for SEO even if slightly outdated. Update them when traffic picks up.
