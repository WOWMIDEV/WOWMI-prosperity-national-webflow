/*
{
  serviceName: "zillow",
  serviceArgs: {
    zillow_partner_id: getContentElement(elements["zillow_partner_id"]),
    zillow_nmls_id: getContentElement(elements["zillow_nmls_id"])
  },
  commonArgs: {
  company: getContentElement(elements["company"]),
  ...configRequest.args
  },
  base: configRequest.base,
  dependence: ["zillow_partner_id", "zillow_nmls_id"]}
 */
export const buildReviewsUrl = (config) => {
  const { serviceName, serviceArgs, commonArgs, base, dependence = null } = config;
  const { company } = commonArgs;
  const url = new URL(base);

  if (!company) {
    // eslint-disable-next-line no-console
    console.warn('No find company name.');
    return false;
  }

  if (dependence) {
    const check = dependence.every((item) => serviceArgs[item]);

    if (!check) {
      // eslint-disable-next-line no-console
      console.warn('Parameters keys must be equals to dependence!');
      return false;
    }
  }

  // set service args
  if (serviceArgs) {
    Object.entries(serviceArgs).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(`service[${serviceName}][${key}]`, value);
      }
    });
  }

  if (!serviceArgs) {
    url.searchParams.set(`service[${serviceName}]`, '');
  }

  // set common args
  Object.entries(commonArgs).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return url.href;
};
